package com.agentic.android.model

/**
 * Registry of popular lightweight quantized models available for download.
 * All models are in GGUF format for LLaMA.cpp compatibility.
 */
object QuantizedModelRegistry {

    data class ModelInfo(
        val name: String,
        val displayName: String,
        val url: String,
        val size: String,
        val format: String = "GGUF",
        val supportedTasks: List<String> = listOf("chat", "completion"),
        val description: String
    )

    val availableModels = listOf(
        ModelInfo(
            name = "mistral-7b-instruct-q4.gguf",
            displayName = "Mistral 7B Instruct (Q4)",
            url = "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/Mistral-7B-Instruct-v0.2-Q4_K_M.gguf",
            size = "4.5 GB",
            description = "Fast, capable 7B model. Good for chat and general tasks."
        ),
        ModelInfo(
            name = "llama2-7b-chat-q4.gguf",
            displayName = "Llama2 7B Chat (Q4)",
            url = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf",
            size = "4.3 GB",
            description = "Safe, well-tested 7B model. Excellent for chat."
        ),
        ModelInfo(
            name = "neural-chat-7b-q4.gguf",
            displayName = "Neural Chat 7B (Q4)",
            url = "https://huggingface.co/TheBloke/neural-chat-7B-v3-1-GGUF/resolve/main/neural-chat-7b-v3-1.Q4_K_M.gguf",
            size = "4.3 GB",
            description = "Chat-optimized model with good performance."
        ),
        ModelInfo(
            name = "orca-mini-7b-q4.gguf",
            displayName = "Orca Mini 7B (Q4)",
            url = "https://huggingface.co/TheBloke/orca_mini_v3_7B-GGUF/resolve/main/orca-mini-7B.Q4_K_M.gguf",
            size = "4.3 GB",
            description = "Instruction-following 7B model."
        ),
        ModelInfo(
            name = "mistral-7b-q5.gguf",
            displayName = "Mistral 7B (Q5 - Higher Quality)",
            url = "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/Mistral-7B-Instruct-v0.2-Q5_K_M.gguf",
            size = "6.5 GB",
            description = "Higher quality (Q5) Mistral for better accuracy."
        ),
        ModelInfo(
            name = "tinyllama-1b-q8.gguf",
            displayName = "TinyLlama 1B (Q8 - Ultra-Light)",
            url = "https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q8_0.gguf",
            size = "1.1 GB",
            description = "Tiny 1.1B model for low-resource devices."
        )
    )

    fun getModelByName(name: String): ModelInfo? {
        return availableModels.find { it.name == name }
    }

    fun getPopularModels(): List<ModelInfo> {
        return availableModels.take(3)
    }

    fun getModelsBySize(maxSizeGb: Int): List<ModelInfo> {
        return availableModels.filter { 
            it.size.split(" ")[0].toFloatOrNull() ?: 0f <= maxSizeGb
        }
    }
}
