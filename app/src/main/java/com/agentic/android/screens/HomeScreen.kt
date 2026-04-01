package com.agentic.android.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.agentic.android.ActionRow
import com.agentic.android.InfoBadge
import com.agentic.android.IntakeRequestType
import com.agentic.android.R
import com.agentic.android.ResponsiveLayout
import com.agentic.android.ResponsivePair
import com.agentic.android.SectionCard
import com.agentic.android.SectionTitle
import com.agentic.android.homeQuickActions
import com.agentic.android.homeReviews

@Composable
internal fun HomeScreen(
    layout: ResponsiveLayout,
    onRequestQuote: (IntakeRequestType) -> Unit,
    onOpenPortal: () -> Unit,
    onExploreCoverage: () -> Unit,
    onContactOffice: (IntakeRequestType) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        HomeHeroSection(layout, onRequestQuote, onOpenPortal)
        PhotographySection(layout)
        QuickActionsSection(layout, onRequestQuote, onOpenPortal, onExploreCoverage, onContactOffice)
        ReviewsSection()
    }
}

@Composable
private fun HomeHeroSection(
    layout: ResponsiveLayout,
    onRequestQuote: (IntakeRequestType) -> Unit,
    onOpenPortal: () -> Unit
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        shape = RoundedCornerShape(28.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.18f))
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(layout.heroHeight)
        ) {
            Image(
                painter = painterResource(id = R.drawable.abel_site_texture),
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                Color(0x990B2D50),
                                Color(0xE60B2D50)
                            )
                        )
                    )
            )
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(if (layout.compactWidth) 16.dp else 20.dp),
                verticalArrangement = Arrangement.spacedBy(if (layout.compactWidth) 10.dp else 12.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(18.dp),
                    color = MaterialTheme.colorScheme.surface.copy(alpha = 0.96f)
                ) {
                    Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = if (layout.compactWidth) 12.dp else 14.dp)) {
                        Image(
                            painter = painterResource(id = R.drawable.abel_logo_wordmark),
                            contentDescription = "Abel Insurance Group logo",
                            modifier = Modifier
                                .widthIn(max = layout.heroLogoWidth)
                                .height(if (layout.compactWidth) 34.dp else 40.dp),
                            contentScale = ContentScale.Fit
                        )
                    }
                }

                Text(
                    text = "We're Here to Put Your Needs First",
                    style = if (layout.compactWidth) MaterialTheme.typography.headlineSmall else MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Text(
                    text = "Abel Insurance Group is dedicated to protecting what matters most.",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
                Text(
                    text = "Serving Buckhannon, WV and beyond with local expertise, modern technology, and straightforward insurance guidance.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.92f)
                )

                if (layout.compactWidth) {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            InfoBadge("Personal")
                            InfoBadge("Business")
                        }
                        InfoBadge("Independent")
                    }
                } else {
                    Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        InfoBadge("Personal")
                        InfoBadge("Business")
                        InfoBadge("Independent")
                    }
                }

                Spacer(modifier = Modifier.weight(1f))

                Text(
                    text = "Licensed in WV, VA, MD, OH, PA, and KY.",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )

                ResponsivePair(
                    stacked = layout.singleColumn,
                    first = { modifier ->
                        Button(
                            onClick = { onRequestQuote(IntakeRequestType.PersonalQuote) },
                            modifier = modifier,
                            colors = ButtonDefaults.buttonColors(
                                containerColor = MaterialTheme.colorScheme.primary,
                                contentColor = MaterialTheme.colorScheme.onPrimary
                            )
                        ) {
                            Text("Request Quote")
                        }
                    },
                    second = { modifier ->
                        OutlinedButton(
                            onClick = onOpenPortal,
                            modifier = modifier,
                            border = BorderStroke(1.dp, MaterialTheme.colorScheme.surface.copy(alpha = 0.7f)),
                            colors = ButtonDefaults.outlinedButtonColors(
                                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                        ) {
                            Text("Visit Portal")
                        }
                    }
                )
            }
        }
    }
}

@Composable
private fun PhotographySection(layout: ResponsiveLayout) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        SectionTitle("Featured Coverage Moments")
        if (layout.wideLayout) {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
                PhotoCard(
                    title = "Personal protection",
                    summary = "A calm, family-first view that aligns with Abel's home and auto coverage approach.",
                    imageRes = R.drawable.abel_family_hero,
                    modifier = Modifier.weight(1f),
                    imageHeight = layout.photoHeight
                )
                PhotoCard(
                    title = "Business protection",
                    summary = "A small-business image that fits the agency's commercial and industry coverage focus.",
                    imageRes = R.drawable.abel_business_hero,
                    modifier = Modifier.weight(1f),
                    imageHeight = layout.photoHeight
                )
            }
        } else {
            PhotoCard(
                title = "Personal protection",
                summary = "A calm, family-first view that aligns with Abel's home and auto coverage approach.",
                imageRes = R.drawable.abel_family_hero,
                modifier = Modifier.fillMaxWidth(),
                imageHeight = layout.photoHeight
            )
            PhotoCard(
                title = "Business protection",
                summary = "A small-business image that fits the agency's commercial and industry coverage focus.",
                imageRes = R.drawable.abel_business_hero,
                modifier = Modifier.fillMaxWidth(),
                imageHeight = layout.photoHeight
            )
        }
    }
}

@Composable
private fun PhotoCard(title: String, summary: String, imageRes: Int, modifier: Modifier = Modifier, imageHeight: Dp) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.16f))
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Image(
                painter = painterResource(id = imageRes),
                contentDescription = title,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(imageHeight)
                    .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)),
                contentScale = ContentScale.Crop
            )
            Column(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
                Text(summary, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Spacer(modifier = Modifier.height(2.dp))
        }
    }
}

@Composable
private fun QuickActionsSection(
    layout: ResponsiveLayout,
    onRequestQuote: (IntakeRequestType) -> Unit,
    onOpenPortal: () -> Unit,
    onExploreCoverage: () -> Unit,
    onContactOffice: (IntakeRequestType) -> Unit
) {
    SectionCard(title = "Quick Actions") {
        ActionRow(
            left = homeQuickActions[0],
            right = homeQuickActions[1],
            stacked = layout.singleColumn,
            onLeftClick = { onRequestQuote(IntakeRequestType.PersonalQuote) },
            onRightClick = onOpenPortal
        )
        ActionRow(
            left = homeQuickActions[2],
            right = homeQuickActions[3],
            stacked = layout.singleColumn,
            onLeftClick = onExploreCoverage,
            onRightClick = { onContactOffice(IntakeRequestType.GeneralContact) }
        )
    }
}

@Composable
private fun ReviewsSection() {
    SectionCard(title = "Client Feedback") {
        homeReviews.forEachIndexed { index, review ->
            ReviewCard(review)
            if (index < homeReviews.lastIndex) {
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun ReviewCard(review: com.agentic.android.Review) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text("\"${review.quote}\"", style = MaterialTheme.typography.bodyMedium)
        Text(review.author, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}