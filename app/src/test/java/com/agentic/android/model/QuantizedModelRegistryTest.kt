package com.agentic.android.model

import org.junit.Assert.assertTrue
import org.junit.Test

class QuantizedModelRegistryTest {

    @Test
    fun s25UltraPackIsCappedAtTenGb() {
        val models = QuantizedModelRegistry.getSamsungS25UltraPack(maxSizeGb = 10)
        assertTrue("Expected at least one model in S25 pack", models.isNotEmpty())
        assertTrue(
            "All S25 pack models must be <= 10 GB",
            models.all { (it.size.split(" ")[0].toFloatOrNull() ?: 0f) <= 10f }
        )
    }

    @Test
    fun s25UltraPackContainsNonTinyLlamaOptions() {
        val models = QuantizedModelRegistry.getSamsungS25UltraPack(maxSizeGb = 10)
        assertTrue(
            "Expected non-TinyLlama options for S25 pack",
            models.any { !it.name.contains("tinyllama", ignoreCase = true) }
        )
    }
}
