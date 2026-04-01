package com.agentic.android

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.OpenInNew
import androidx.compose.material.icons.outlined.Business
import androidx.compose.material.icons.outlined.Call
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.Description
import androidx.compose.material.icons.outlined.DirectionsCar
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material.icons.outlined.VerifiedUser
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.agentic.android.ui.theme.AgenticAndroidTheme

private const val MainSiteUrl = "https://www.abelinsgroup.com/"
private const val PersonalInsuranceUrl = "https://www.abelinsgroup.com/personal-insurance/"
private const val BusinessInsuranceUrl = "https://www.abelinsgroup.com/business-insurance/"
private const val IndustryInsuranceUrl = "https://www.abelinsgroup.com/business-insurance/insurance-by-industry/"
private const val ClientPortalUrl = "https://customerservice.agentinsure.com/EzLynxCustomerService/web/abel/account/login"
private const val ContactFormUrl = "https://www.abelinsgroup.com/contact/#get-in-touch"
private const val PersonalQuoteUrl = "https://form.jotform.com/Abel_Travis/AIG_Quote_Form"
private const val CommercialQuoteUrl = "https://form.jotform.com/Abel_Travis/AIG_Commercial_Quote_Form"
private const val LifeQuoteUrl = "https://app.back9ins.com/apply/TravisAbel"
private const val FacebookUrl = "https://www.facebook.com/Abel.Ins.Group"
private const val LinkedInUrl = "https://www.linkedin.com/company/abelinsgroup/"
private const val OfficePhone = "3048785900"
private const val OfficePhoneDisplay = "304-878-5900"
private const val OfficeEmail = "contact@abelinsgroup.com"
private const val OfficeFaxDisplay = "304-621-6044"
private const val OfficeAddress = "172 S. Kanawha Street, Buckhannon, WV 26201"

private data class CoverageGroup(
    val title: String,
    val summary: String,
    val items: List<String>,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val ctaLabel: String,
    val ctaUrl: String
)

private data class ActionItem(
    val title: String,
    val summary: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector,
    val target: String
)

private data class ServiceDestination(
    val title: String,
    val summary: String,
    val url: String
)

private data class Review(
    val quote: String,
    val author: String
)

private data class ResponsiveLayout(
    val compactWidth: Boolean,
    val compactHeight: Boolean,
    val singleColumn: Boolean,
    val wideLayout: Boolean,
    val contentPadding: Dp,
    val heroHeight: Dp,
    val photoHeight: Dp,
    val webViewHeight: Dp,
    val topBarLogoWidth: Dp,
    val heroLogoWidth: Dp
)

@Composable
private fun rememberResponsiveLayout(): ResponsiveLayout {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp
    val screenHeight = configuration.screenHeightDp
    val wideLayout = screenWidth >= 840
    val compactWidth = screenWidth < 380
    val singleColumn = screenWidth < 430
    val compactHeight = screenHeight < 700

    return ResponsiveLayout(
        compactWidth = compactWidth,
        compactHeight = compactHeight,
        singleColumn = singleColumn,
        wideLayout = wideLayout,
        contentPadding = when {
            wideLayout -> 24.dp
            compactWidth -> 12.dp
            else -> 16.dp
        },
        heroHeight = when {
            wideLayout -> 420.dp
            compactHeight -> 300.dp
            compactWidth -> 340.dp
            else -> 360.dp
        },
        photoHeight = when {
            wideLayout -> 220.dp
            compactWidth -> 164.dp
            else -> 188.dp
        },
        webViewHeight = when {
            wideLayout -> 520.dp
            compactHeight -> 320.dp
            else -> 420.dp
        },
        topBarLogoWidth = when {
            wideLayout -> 280.dp
            compactWidth -> 188.dp
            else -> 224.dp
        },
        heroLogoWidth = when {
            wideLayout -> 300.dp
            compactWidth -> 208.dp
            else -> 248.dp
        }
    )
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AgenticAndroidTheme {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    AbelInsuranceApp()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AbelInsuranceApp() {
    val layout = rememberResponsiveLayout()
    val serviceDestinations = remember {
        listOf(
            ServiceDestination("Client Portal", "Policy servicing and account requests.", ClientPortalUrl),
            ServiceDestination("Contact Form", "Send a question or request directly to the agency.", ContactFormUrl),
            ServiceDestination("Personal Quote", "Start a household coverage quote.", PersonalQuoteUrl),
            ServiceDestination("Commercial Quote", "Start a business quote workflow.", CommercialQuoteUrl),
            ServiceDestination("Life Quote", "Open the life insurance quote experience.", LifeQuoteUrl)
        )
    }
    var activeDestination by remember { mutableStateOf(serviceDestinations.first()) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            AbelTopBar(layout)
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        listOf(
                            MaterialTheme.colorScheme.surfaceVariant,
                            MaterialTheme.colorScheme.background
                        )
                    )
                )
                .padding(innerPadding)
                .padding(horizontal = layout.contentPadding, vertical = 12.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .widthIn(max = 920.dp)
                    .align(Alignment.TopCenter)
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                HeroSection(layout)
                PhotographySection(layout)
                QuickActionsSection(layout)
                CoverageSection()
                ServiceCenterSection(
                    activeDestination = activeDestination,
                    destinations = serviceDestinations,
                    onDestinationChange = { activeDestination = it },
                    layout = layout
                )
                ReviewsSection()
                ContactSection(layout)
            }
        }
    }
}

@Composable
private fun AbelTopBar(layout: ResponsiveLayout) {
    Surface(
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 3.dp,
        tonalElevation = 1.dp
    ) {
        Box(modifier = Modifier.fillMaxWidth()) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .widthIn(max = 920.dp)
                    .align(Alignment.TopCenter)
                    .statusBarsPadding()
                    .padding(horizontal = layout.contentPadding, vertical = if (layout.compactWidth) 10.dp else 12.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.abel_logo_wordmark),
                    contentDescription = "Abel Insurance Group",
                    modifier = Modifier
                        .widthIn(max = layout.topBarLogoWidth)
                        .height(if (layout.compactWidth) 30.dp else 36.dp),
                    contentScale = ContentScale.Fit
                )
                Text(
                    "Local Knowledge, Innovative Solutions.",
                    style = if (layout.compactWidth) MaterialTheme.typography.bodySmall else MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun HeroSection(layout: ResponsiveLayout) {
    val context = LocalContext.current

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
                            onClick = { launchUriIntent(context, PersonalQuoteUrl) },
                            modifier = modifier,
                            colors = androidx.compose.material3.ButtonDefaults.buttonColors(
                                containerColor = MaterialTheme.colorScheme.primary,
                                contentColor = MaterialTheme.colorScheme.onPrimary
                            )
                        ) {
                            Text("Request Quote")
                        }
                    },
                    second = { modifier ->
                        OutlinedButton(
                            onClick = { launchUriIntent(context, ClientPortalUrl) },
                            modifier = modifier,
                            border = BorderStroke(1.dp, MaterialTheme.colorScheme.surface.copy(alpha = 0.7f)),
                            colors = androidx.compose.material3.ButtonDefaults.outlinedButtonColors(
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
private fun QuickActionsSection(layout: ResponsiveLayout) {
    val coverageActions = listOf(
        ActionItem("Request Quote", "Open Abel's quote workflow.", Icons.Outlined.Description, PersonalQuoteUrl),
        ActionItem("Client Portal", "Manage policies and service requests.", Icons.AutoMirrored.Outlined.OpenInNew, ClientPortalUrl),
        ActionItem("Call Office", "Speak with the Buckhannon team.", Icons.Outlined.Call, "tel:$OfficePhone"),
        ActionItem("Email", "Send a message to the office inbox.", Icons.Outlined.Email, "mailto:$OfficeEmail")
    )

    SectionCard(title = "Quick Actions") {
        ActionRow(coverageActions[0], coverageActions[1], layout.singleColumn)
        ActionRow(coverageActions[2], coverageActions[3], layout.singleColumn)
    }
}

@Composable
private fun CoverageSection() {
    val groups = listOf(
        CoverageGroup(
            title = "Personal Insurance",
            summary = "Protection for household property, vehicles, liability, and life-stage needs.",
            items = listOf("Home", "Auto", "Umbrella", "Motorcycle", "Flood", "Life", "Renters"),
            icon = Icons.Outlined.Home,
            ctaLabel = "See personal options",
            ctaUrl = PersonalInsuranceUrl
        ),
        CoverageGroup(
            title = "Business Insurance",
            summary = "Coverage for operations, property, staff, fleets, and risk management.",
            items = listOf("Business owners", "General liability", "Commercial property", "Workers' comp", "Commercial bonds", "Cyber liability"),
            icon = Icons.Outlined.Business,
            ctaLabel = "See business options",
            ctaUrl = BusinessInsuranceUrl
        ),
        CoverageGroup(
            title = "Insurance by Industry",
            summary = "Coverage packages designed around trade-specific exposures.",
            items = listOf("Contractors", "Rental property", "Condo buildings", "Restaurants", "Trucking"),
            icon = Icons.Outlined.DirectionsCar,
            ctaLabel = "See industry options",
            ctaUrl = IndustryInsuranceUrl
        )
    )

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        SectionTitle("Coverage Snapshot")
        groups.forEach { group ->
            CoverageCard(group)
        }
    }
}

@Composable
private fun ServiceCenterSection(
    activeDestination: ServiceDestination,
    destinations: List<ServiceDestination>,
    onDestinationChange: (ServiceDestination) -> Unit,
    layout: ResponsiveLayout
) {
    val context = LocalContext.current

    SectionCard(title = "Service Center") {
        Text(
            text = "Use the in-app webview to work inside Abel's client portal, contact form, or quote pages without leaving the app.",
            style = MaterialTheme.typography.bodyMedium
        )

        if (layout.singleColumn) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                destinations.forEach { destination ->
                    val selected = destination.title == activeDestination.title
                    OutlinedButton(
                        onClick = { onDestinationChange(destination) },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(if (selected) "• ${destination.title}" else destination.title)
                    }
                }
            }
        } else {
            destinations.chunked(2).forEach { rowItems ->
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
                    rowItems.forEach { destination ->
                        val selected = destination.title == activeDestination.title
                        OutlinedButton(
                            onClick = { onDestinationChange(destination) },
                            modifier = Modifier.weight(1f)
                        ) {
                            Text(if (selected) "• ${destination.title}" else destination.title)
                        }
                    }
                    if (rowItems.size == 1) {
                        Spacer(modifier = Modifier.weight(1f))
                    }
                }
            }
        }

        Text(activeDestination.summary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

        WebViewCard(url = activeDestination.url, height = layout.webViewHeight)

        OutlinedButton(onClick = { launchUriIntent(context, activeDestination.url) }, modifier = Modifier.fillMaxWidth()) {
            Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Open current page externally")
        }
    }
}

@Composable
private fun WebViewCard(url: String, height: Dp) {
    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.16f))
    ) {
        AndroidView(
            modifier = Modifier
                .fillMaxWidth()
                .height(height),
            factory = { context ->
                WebView(context).apply {
                    CookieManager.getInstance().setAcceptCookie(true)
                    CookieManager.getInstance().setAcceptThirdPartyCookies(this, true)
                    settings.javaScriptEnabled = true
                    settings.domStorageEnabled = true
                    settings.loadsImagesAutomatically = true
                    settings.useWideViewPort = true
                    settings.loadWithOverviewMode = true
                    webChromeClient = WebChromeClient()
                    webViewClient = WebViewClient()
                    loadUrl(url)
                }
            },
            update = { webView ->
                if (webView.url != url) {
                    webView.loadUrl(url)
                }
            }
        )
    }
}

@Composable
private fun ReviewsSection() {
    val reviews = listOf(
        Review("Excellent communication from a knowledgeable and friendly staff helped us secure a competitive rate for our insurance needs.", "Terri O."),
        Review("They were great helping us get our insurance coverage set up. They were prompt and professional.", "Kelly C."),
        Review("Wonderful company. Travis and Joyce have been awesome at finding the best coverage for us and helped to find coverage that is affordable.", "Sharla S.")
    )

    SectionCard(title = "Client Feedback") {
        reviews.forEachIndexed { index, review ->
            ReviewCard(review)
            if (index < reviews.lastIndex) {
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun ReviewCard(review: Review) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text("\"${review.quote}\"", style = MaterialTheme.typography.bodyMedium)
        Text(review.author, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun ContactSection(layout: ResponsiveLayout) {
    val context = LocalContext.current

    SectionCard(title = "Contact Us") {
        ContactRow(Icons.Outlined.LocationOn, OfficeAddress)
        ContactRow(Icons.Outlined.Call, OfficePhoneDisplay)
        ContactRow(Icons.Outlined.Email, OfficeEmail)
        ContactRow(Icons.Outlined.Description, "Fax: $OfficeFaxDisplay")
        ContactRow(Icons.Outlined.VerifiedUser, "Licensed in WV, VA, MD, OH, PA, and KY")
        Spacer(modifier = Modifier.height(4.dp))
        ResponsivePair(
            stacked = layout.singleColumn,
            first = { modifier ->
                OutlinedButton(
                    onClick = { launchUriIntent(context, MainSiteUrl) },
                    modifier = modifier
                ) {
                    Icon(Icons.Outlined.Language, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Website")
                }
            },
            second = { modifier ->
                OutlinedButton(
                    onClick = { launchUriIntent(context, FacebookUrl) },
                    modifier = modifier
                ) {
                    Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Facebook")
                }
            }
        )
        ResponsivePair(
            stacked = layout.singleColumn,
            first = { modifier ->
                OutlinedButton(
                    onClick = { launchUriIntent(context, LinkedInUrl) },
                    modifier = modifier
                ) {
                    Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("LinkedIn")
                }
            },
            second = { modifier ->
                OutlinedButton(
                    onClick = { launchUriIntent(context, "geo:0,0?q=${Uri.encode(OfficeAddress)}") },
                    modifier = modifier
                ) {
                    Icon(Icons.Outlined.LocationOn, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Directions")
                }
            }
        )
    }
}

@Composable
private fun ActionRow(left: ActionItem, right: ActionItem, stacked: Boolean) {
    ResponsivePair(stacked, first = { modifier ->
        ActionCard(left, modifier)
    }, second = { modifier ->
        ActionCard(right, modifier)
    })
}

@Composable
private fun ActionCard(action: ActionItem, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.16f))
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(14.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(action.icon, contentDescription = null, tint = MaterialTheme.colorScheme.onPrimaryContainer)
            }
            Text(action.title, fontWeight = FontWeight.SemiBold)
            Text(action.summary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            OutlinedButton(onClick = { launchUriIntent(context, action.target) }, modifier = Modifier.fillMaxWidth()) {
                Text("Open")
            }
        }
    }
}

@Composable
private fun CoverageCard(group: CoverageGroup) {
    val context = LocalContext.current
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.16f))
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(14.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(group.icon, contentDescription = null, tint = MaterialTheme.colorScheme.onPrimaryContainer)
                }
                Column {
                    Text(group.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(group.summary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            group.items.forEach { item ->
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Outlined.CheckCircle, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                    Text(item, style = MaterialTheme.typography.bodyMedium)
                }
            }
            Button(onClick = { launchUriIntent(context, group.ctaUrl) }, modifier = Modifier.fillMaxWidth()) {
                Text(group.ctaLabel)
            }
        }
    }
}

@Composable
private fun ContactRow(icon: androidx.compose.ui.graphics.vector.ImageVector, text: String) {
    Row(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
        Text(text, style = MaterialTheme.typography.bodyMedium)
    }
}

@Composable
private fun SectionCard(title: String, content: @Composable ColumnScope.() -> Unit) {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.16f))
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .width(58.dp)
                    .height(4.dp)
                    .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(999.dp))
            )
            Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            HorizontalDivider()
            content()
        }
    }
}

@Composable
private fun SectionTitle(title: String) {
    Text(
        title,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.SemiBold,
        color = MaterialTheme.colorScheme.onBackground
    )
}

@Composable
private fun InfoBadge(text: String) {
    Box(
        modifier = Modifier
            .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(999.dp))
            .padding(horizontal = 12.dp, vertical = 8.dp)
    ) {
        Text(text, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSecondaryContainer)
    }
}

@Composable
private fun ResponsivePair(
    stacked: Boolean,
    first: @Composable (Modifier) -> Unit,
    second: @Composable (Modifier) -> Unit
) {
    if (stacked) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            first(Modifier.fillMaxWidth())
            second(Modifier.fillMaxWidth())
        }
    } else {
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            first(Modifier.weight(1f))
            second(Modifier.weight(1f))
        }
    }
}

private fun launchUriIntent(context: Context, target: String) {
    val intent = when {
        target.startsWith("mailto:") -> Intent(Intent.ACTION_SENDTO, Uri.parse(target))
        target.startsWith("tel:") -> Intent(Intent.ACTION_DIAL, Uri.parse(target))
        target.startsWith("geo:") -> Intent(Intent.ACTION_VIEW, Uri.parse(target))
        else -> Intent(Intent.ACTION_VIEW, Uri.parse(target))
    }

    runCatching {
        context.startActivity(intent)
    }.recoverCatching {
        context.startActivity(Intent.createChooser(intent, "Open with"))
    }.getOrElse {
        if (it !is ActivityNotFoundException) {
            throw it
        }
    }
}
