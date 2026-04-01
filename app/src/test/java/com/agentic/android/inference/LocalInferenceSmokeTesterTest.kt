package com.agentic.android.inference

import org.junit.Assert.assertTrue
import org.junit.Assume.assumeTrue
import org.junit.Test
import java.io.File

class LocalInferenceSmokeTesterTest {

    @Test
    fun smokeChatRunsForAllDownloadedGgufModels() {
        val modelDir = File("../hf-models")
        assumeTrue("hf-models directory is required for this smoke test", modelDir.exists())

        val ggufFiles = modelDir.listFiles { f -> f.isFile && f.name.endsWith(".gguf") }?.toList().orEmpty()
        assumeTrue("At least one GGUF model is required for this smoke test", ggufFiles.isNotEmpty())

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
    }
}
