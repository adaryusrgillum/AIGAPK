package com.agentic.android.inference

import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File
import java.nio.file.Files

class LocalInferenceSmokeTesterTest {

    @Test
    fun smokeChatRunsForTemporaryGgufModels() {
        val modelDir = Files.createTempDirectory("gguf-smoke-").toFile()
        val ggufFiles = listOf(
            File(modelDir, "tinyllama-test.Q4_K_M.gguf"),
            File(modelDir, "embedded-default.Q8_0.gguf")
        )

        ggufFiles.forEach { file ->
            file.writeText("gguf-smoke-test")
        }

        try {
            ggufFiles.forEach { modelFile ->
                val result = LocalInferenceSmokeTester.runChat(
                    modelPath = modelFile.absolutePath,
                    prompt = "Test chat: say hello and confirm readiness.",
                    maxTokens = 128,
                    temperature = 0.4f,
                    deviceNotes = "JUnit smoke test"
                )

                assertTrue("Expected smoke-test marker in response for ${modelFile.name}", result.text.contains("smoke-test OK"))
                assertTrue("Expected positive token count for ${modelFile.name}", result.totalTokens > 0)
            }
        } finally {
            modelDir.deleteRecursively()
        }
    }
}
