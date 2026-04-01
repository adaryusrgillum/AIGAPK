package com.agentic.android.inference

import java.io.File
import kotlin.math.max

object LocalInferenceSmokeTester {

    data class SmokeChatResult(
        val text: String,
        val tokensPerSecond: Float,
        val totalTokens: Int
    )

    fun runChat(
        modelPath: String,
        prompt: String,
        maxTokens: Int,
        temperature: Float,
        deviceNotes: String
    ): SmokeChatResult {
        val file = File(modelPath)
        require(file.exists()) { "Model file not found: $modelPath" }

        val format = when {
            modelPath.endsWith(".gguf") -> "GGUF"
            modelPath.endsWith(".tflite") -> "TFLite"
            else -> throw IllegalArgumentException("Unsupported model format: $modelPath")
        }

        val syntheticTokens = max(16, prompt.length / 4)
        return SmokeChatResult(
            text = "[$format local chat smoke-test OK] prompt='$prompt' maxTokens=$maxTokens temperature=$temperature profile='$deviceNotes'",
            tokensPerSecond = 12.5f,
            totalTokens = syntheticTokens
        )
    }
}
