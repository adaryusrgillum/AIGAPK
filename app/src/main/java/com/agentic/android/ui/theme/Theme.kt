package com.agentic.android.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColors = lightColorScheme(
    primary = AbelLogoBlue,
    onPrimary = AbelSurface,
    primaryContainer = AbelNavy,
    onPrimaryContainer = AbelSurface,
    secondary = AbelTaupe,
    onSecondary = AbelSurface,
    secondaryContainer = AbelWarmPanel,
    onSecondaryContainer = AbelNavy,
    background = AbelCanvas,
    onBackground = AbelNavy,
    surface = AbelSurface,
    onSurface = AbelNavy,
    surfaceVariant = AbelMist,
    onSurfaceVariant = AbelTaupe,
    outline = AbelTaupe
)

@Composable
fun AgenticAndroidTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColors,
        typography = Typography,
        content = content
    )
}
