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
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
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
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Image(
                            painter = painterResource(id = R.drawable.abel_logo_mark),
                            contentDescription = "Abel Insurance Group",
                            modifier = Modifier.size(38.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text("Abel Insurance Group", fontWeight = FontWeight.SemiBold)
                            Text(
                                "Local knowledge, innovative solutions",
                                style = MaterialTheme.typography.labelMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
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
                .padding(16.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            HeroSection()
            PhotographySection()
            QuickActionsSection()
            CoverageSection()
            ServiceCenterSection(
                activeDestination = activeDestination,
                destinations = serviceDestinations,
                onDestinationChange = { activeDestination = it }
            )
            ReviewsSection()
            ContactSection()
        }
    }
}

@Composable
private fun HeroSection() {
    val context = LocalContext.current

    Card(
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
        shape = RoundedCornerShape(28.dp)
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Image(
                    painter = painterResource(id = R.drawable.abel_logo_mark),
                    contentDescription = "Abel Insurance mark",
                    modifier = Modifier.size(64.dp)
                )
                Spacer(modifier = Modifier.width(12.dp))
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(
                        text = "Abel Insurance Group",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Family-owned independent insurance agency",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
            }

            Text(
                text = "Helping Buckhannon, WV and surrounding communities compare coverage with confidence across personal, business, and industry-specific risk.",
                style = MaterialTheme.typography.bodyLarge
            )
            Text(
                text = "Licensed in WV, VA, MD, OH, PA, and KY.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )

            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                InfoBadge("Home")
                InfoBadge("Business")
                InfoBadge("Industry")
            }

            Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
                Button(
                    onClick = { launchUriIntent(context, PersonalQuoteUrl) },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Get A Quote")
                }
                OutlinedButton(
                    onClick = { launchUriIntent(context, ClientPortalUrl) },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Client Portal")
                }
            }
        }
    }
}

@Composable
private fun PhotographySection() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        SectionTitle("Featured Coverage Moments")
        PhotoCard(
            title = "Personal protection",
            summary = "A calm, family-first view that aligns with Abel's home and auto coverage approach.",
            imageRes = R.drawable.abel_family_hero
        )
        PhotoCard(
            title = "Business protection",
            summary = "A small-business image that fits the agency's commercial and industry coverage focus.",
            imageRes = R.drawable.abel_business_hero
        )
    }
}

@Composable
private fun PhotoCard(title: String, summary: String, imageRes: Int) {
    Card(shape = RoundedCornerShape(24.dp)) {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Image(
                painter = painterResource(id = imageRes),
                contentDescription = title,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(188.dp)
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
private fun QuickActionsSection() {
    val coverageActions = listOf(
        ActionItem("Request Quote", "Open Abel's quote workflow.", Icons.Outlined.Description, PersonalQuoteUrl),
        ActionItem("Client Portal", "Manage policies and service requests.", Icons.AutoMirrored.Outlined.OpenInNew, ClientPortalUrl),
        ActionItem("Call Office", "Speak with the Buckhannon team.", Icons.Outlined.Call, "tel:$OfficePhone"),
        ActionItem("Email", "Send a message to the office inbox.", Icons.Outlined.Email, "mailto:$OfficeEmail")
    )

    SectionCard(title = "Quick Actions") {
        ActionRow(coverageActions[0], coverageActions[1])
        ActionRow(coverageActions[2], coverageActions[3])
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
    onDestinationChange: (ServiceDestination) -> Unit
) {
    val context = LocalContext.current

    SectionCard(title = "Service Center") {
        Text(
            text = "Use the in-app webview to work inside Abel's client portal, contact form, or quote pages without leaving the app.",
            style = MaterialTheme.typography.bodyMedium
        )

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

        Text(activeDestination.summary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

        WebViewCard(url = activeDestination.url)

        OutlinedButton(onClick = { launchUriIntent(context, activeDestination.url) }, modifier = Modifier.fillMaxWidth()) {
            Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Open current page externally")
        }
    }
}

@Composable
private fun WebViewCard(url: String) {
    Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
        AndroidView(
            modifier = Modifier
                .fillMaxWidth()
                .height(420.dp),
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
private fun ContactSection() {
    val context = LocalContext.current

    SectionCard(title = "Contact And Service Area") {
        ContactRow(Icons.Outlined.LocationOn, OfficeAddress)
        ContactRow(Icons.Outlined.Call, OfficePhoneDisplay)
        ContactRow(Icons.Outlined.Email, OfficeEmail)
        ContactRow(Icons.Outlined.Description, "Fax: $OfficeFaxDisplay")
        ContactRow(Icons.Outlined.VerifiedUser, "Licensed in WV, VA, MD, OH, PA, and KY")
        Spacer(modifier = Modifier.height(4.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                onClick = { launchUriIntent(context, MainSiteUrl) },
                modifier = Modifier.weight(1f)
            ) {
                Icon(Icons.Outlined.Language, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Website")
            }
            OutlinedButton(
                onClick = { launchUriIntent(context, FacebookUrl) },
                modifier = Modifier.weight(1f)
            ) {
                Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Facebook")
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                onClick = { launchUriIntent(context, LinkedInUrl) },
                modifier = Modifier.weight(1f)
            ) {
                Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("LinkedIn")
            }
            OutlinedButton(
                onClick = { launchUriIntent(context, "geo:0,0?q=${Uri.encode(OfficeAddress)}") },
                modifier = Modifier.weight(1f)
            ) {
                Icon(Icons.Outlined.LocationOn, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Directions")
            }
        }
    }
}

@Composable
private fun ActionRow(left: ActionItem, right: ActionItem) {
    Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
        ActionCard(left, Modifier.weight(1f))
        ActionCard(right, Modifier.weight(1f))
    }
}

@Composable
private fun ActionCard(action: ActionItem, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(14.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(action.icon, contentDescription = null)
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
    Card(shape = RoundedCornerShape(24.dp)) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(14.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(group.icon, contentDescription = null)
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
    Card(shape = RoundedCornerShape(24.dp)) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            HorizontalDivider()
            content()
        }
    }
}

@Composable
private fun SectionTitle(title: String) {
    Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
}

@Composable
private fun InfoBadge(text: String) {
    Box(
        modifier = Modifier
            .background(MaterialTheme.colorScheme.secondaryContainer, RoundedCornerShape(999.dp))
            .padding(horizontal = 12.dp, vertical = 8.dp)
    ) {
        Text(text, style = MaterialTheme.typography.labelLarge)
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
