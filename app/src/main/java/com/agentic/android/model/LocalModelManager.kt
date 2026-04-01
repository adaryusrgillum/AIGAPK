package com.agentic.android.model

import android.content.Context
import android.os.storage.StorageManager
import java.io.File

class LocalModelManager(private val context: Context) {

    data class InstallResult(
        val success: Boolean,
        val message: String
    )

    private val bundledModelAssetPath = "models"

    private val modelDirectory: File
        get() {
            val baseDirectory = context.getExternalFilesDir(null)
                ?: File(context.filesDir, "local-models")
            val dir = File(baseDirectory, "models")
            if (!dir.exists()) {
                dir.mkdirs()
            }
            return dir
        }

    fun getLocalModelPath(modelName: String): File {
        return File(modelDirectory, modelName)
    }

    fun listLocalModels(): List<String> {
        return modelDirectory.listFiles()?.map { it.name }?.sorted() ?: emptyList()
    }

    fun listBundledModels(): List<String> {
        return context.assets.list(bundledModelAssetPath)
            ?.filter { it.endsWith(".gguf") || it.endsWith(".tflite") }
            ?.sorted()
            ?: emptyList()
    }

    fun getDefaultBundledModelName(): String? {
        return listBundledModels().firstOrNull()
    }

    fun getBundledModelSize(modelName: String): Long {
        return runCatching {
            context.assets.openFd("$bundledModelAssetPath/$modelName").length
        }.getOrDefault(0L)
    }

    fun getRequiredStorageBytes(contentBytes: Long): Long {
        val safetyBuffer = maxOf(64L * 1024 * 1024, contentBytes / 10)
        return contentBytes + safetyBuffer
    }

    fun getAvailableStorage(): Long {
        val targetDirectory = modelDirectory
        return runCatching {
            val storageManager = context.getSystemService(StorageManager::class.java)
            val storageUuid = storageManager.getUuidForPath(targetDirectory)
            storageManager.getAllocatableBytes(storageUuid)
        }.getOrElse {
            targetDirectory.usableSpace
        }
    }

    fun hasEnoughSpaceFor(contentBytes: Long): Boolean {
        return getAvailableStorage() >= getRequiredStorageBytes(contentBytes)
    }

    fun installBundledModel(modelName: String, onProgress: ((Int) -> Unit)? = null): InstallResult {
        val targetFile = getLocalModelPath(modelName)
        if (targetFile.exists()) {
            onProgress?.invoke(100)
            return InstallResult(true, "Bundled model already installed")
        }

        val assetPath = "$bundledModelAssetPath/$modelName"
        val totalBytes = getBundledModelSize(modelName)
        val requiredBytes = getRequiredStorageBytes(totalBytes)

        if (totalBytes > 0L && !hasEnoughSpaceFor(totalBytes)) {
            return InstallResult(
                success = false,
                message = "Not enough storage. Need ${formatSize(requiredBytes)}, found ${formatSize(getAvailableStorage())}."
            )
        }

        return runCatching {
            context.assets.open(assetPath).use { input ->
                targetFile.outputStream().use { output ->
                    val buffer = ByteArray(DEFAULT_BUFFER_SIZE)
                    var bytesCopied = 0L
                    var bytesRead: Int

                    while (input.read(buffer).also { bytesRead = it } != -1) {
                        output.write(buffer, 0, bytesRead)
                        bytesCopied += bytesRead
                        if (totalBytes > 0L) {
                            onProgress?.invoke(((bytesCopied * 100) / totalBytes).toInt())
                        }
                    }
                }
            }
            onProgress?.invoke(100)
            InstallResult(true, "Bundled model installed")
        }.getOrElse {
            targetFile.delete()
            InstallResult(false, "Bundled model install failed: ${it.message}")
        }
    }

    fun getModelSize(modelName: String): Long {
        val file = getLocalModelPath(modelName)
        return if (file.exists()) file.length() else 0L
    }

    fun deleteModel(modelName: String): Boolean {
        val file = getLocalModelPath(modelName)
        return file.delete()
    }

    fun getTotalStorageUsed(): Long {
        return modelDirectory.listFiles()?.sumOf { it.length() } ?: 0L
    }

    fun formatSize(bytes: Long): String {
        return when {
            bytes < 1024 -> "$bytes B"
            bytes < 1024 * 1024 -> "${bytes / 1024} KB"
            bytes < 1024 * 1024 * 1024 -> "${bytes / (1024 * 1024)} MB"
            else -> "${bytes / (1024 * 1024 * 1024)} GB"
        }
    }
}
