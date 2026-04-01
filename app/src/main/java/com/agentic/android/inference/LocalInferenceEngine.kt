package com.agentic.android.inference

import android.content.Context
import android.os.Build
import com.agentic.android.model.LocalModelManager
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import java.io.File
import kotlin.math.max
import kotlin.math.min

class LocalInferenceEngine(
    private val context: Context,
    private val localModelManager: LocalModelManager
) {

    data class DeviceRuntimeProfile(
        val isSamsungS25Ultra: Boolean,
        val preferredThreadCount: Int,
        val preferGpu: Boolean,
        val defaultMaxTokens: Int,
        val defaultTemperature: Float,
        val notes: String
    )

    data class InferenceResult(
        val text: String,
        val tokensPerSecond: Float = 0f,
        val totalTokens: Int = 0,
        val modelName: String = ""
    )

    fun getDeviceRuntimeProfile(): DeviceRuntimeProfile {
        val manufacturer = Build.MANUFACTURER.orEmpty()
        val model = Build.MODEL.orEmpty()
        val isSamsung = manufacturer.equals("samsung", ignoreCase = true)
        val looksLikeS25Ultra = model.contains("S25", ignoreCase = true) || model.contains("S938", ignoreCase = true)
        val isS25Ultra = isSamsung && looksLikeS25Ultra
        val cpuCores = Runtime.getRuntime().availableProcessors()
        val preferredThreads = if (isS25Ultra) {
            min(8, max(4, cpuCores - 2))
        } else {
            min(6, max(2, cpuCores - 2))
        }

        return if (isS25Ultra) {
            DeviceRuntimeProfile(
                isSamsungS25Ultra = true,
                preferredThreadCount = preferredThreads,
                preferGpu = true,
                defaultMaxTokens = 768,
                defaultTemperature = 0.55f,
                notes = "S25 Ultra profile: high context, balanced creativity, GPU preferred."
            )
        } else {
            DeviceRuntimeProfile(
                isSamsungS25Ultra = false,
                preferredThreadCount = preferredThreads,
                preferGpu = false,
                defaultMaxTokens = 512,
                defaultTemperature = 0.65f,
                notes = "Generic profile: balanced defaults for broad Android compatibility."
            )
        }
    }

    fun isModelAvailable(modelName: String): Boolean {
        val modelFile = localModelManager.getLocalModelPath(modelName)
        return modelFile.exists() && (modelFile.name.endsWith(".gguf") || modelFile.name.endsWith(".tflite"))
    }

    fun inferWithLocalModel(
        modelPath: String,
        prompt: String,
        maxTokens: Int = 256,
        temperature: Float = 0.7f
    ): Flow<InferenceResult> = flow {
        val file = File(modelPath)
        if (!file.exists()) {
            throw IllegalArgumentException("Model file not found: $modelPath")
        }

        val profile = getDeviceRuntimeProfile()
        val tunedMaxTokens = min(maxTokens, profile.defaultMaxTokens)
        val tunedTemperature = if (profile.isSamsungS25Ultra) {
            min(temperature, profile.defaultTemperature)
        } else {
            temperature
        }

        val smokeResult = LocalInferenceSmokeTester.runChat(
            modelPath = modelPath,
            prompt = prompt,
            maxTokens = tunedMaxTokens,
            temperature = tunedTemperature,
            deviceNotes = profile.notes
        )

        emit(
            InferenceResult(
                text = smokeResult.text,
                tokensPerSecond = smokeResult.tokensPerSecond,
                totalTokens = smokeResult.totalTokens,
                modelName = file.name
            )
        )
    }

    fun listAvailableLocalModels(): List<Pair<String, String>> {
        return localModelManager.listLocalModels().map { modelName ->
            val size = localModelManager.getModelSize(modelName)
            Pair(modelName, localModelManager.formatSize(size))
        }
    }

    fun getModelInfo(modelName: String): Map<String, String> {
        val file = localModelManager.getLocalModelPath(modelName)
        return mapOf(
            "name" to modelName,
            "path" to file.absolutePath,
            "size" to localModelManager.formatSize(file.length()),
            "format" to when {
                modelName.endsWith(".gguf") -> "LLaMA.cpp (GGUF)"
                modelName.endsWith(".tflite") -> "TensorFlow Lite"
                else -> "Unknown"
            },
            "exists" to file.exists().toString()
        )
    }
}
