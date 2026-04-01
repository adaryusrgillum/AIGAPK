package com.agentic.android

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.OpenInNew
import androidx.compose.material.icons.outlined.Business
import androidx.compose.material.icons.outlined.Call
import androidx.compose.material.icons.outlined.Description
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.VerifiedUser
import androidx.compose.ui.graphics.vector.ImageVector

internal const val MainSiteUrl = "https://www.abelinsgroup.com/"
internal const val PersonalInsuranceUrl = "https://www.abelinsgroup.com/personal-insurance/"
internal const val BusinessInsuranceUrl = "https://www.abelinsgroup.com/business-insurance/"
internal const val IndustryInsuranceUrl = "https://www.abelinsgroup.com/business-insurance/insurance-by-industry/"
internal const val ClientPortalUrl = "https://customerservice.agentinsure.com/EzLynxCustomerService/web/abel/account/login"
internal const val FacebookUrl = "https://www.facebook.com/Abel.Ins.Group"
internal const val LinkedInUrl = "https://www.linkedin.com/company/abelinsgroup/"
internal const val OfficePhone = "3048785900"
internal const val OfficePhoneDisplay = "304-878-5900"
internal const val OfficeEmail = "contact@abelinsgroup.com"
internal const val OfficeFaxDisplay = "304-621-6044"
internal const val OfficeAddress = "172 S. Kanawha Street, Buckhannon, WV 26201"

internal enum class IntakeRequestType(
    val label: String,
    val emailSubject: String,
    val hint: String
) {
    PersonalQuote(
        label = "Personal Quote",
        emailSubject = "Personal Insurance Quote Request",
        hint = "Tell us which home, auto, umbrella, or personal coverages you want quoted."
    ),
    BusinessQuote(
        label = "Business Quote",
        emailSubject = "Business Insurance Quote Request",
        hint = "Describe your business, operations, and the coverages you need reviewed."
    ),
    LifeQuote(
        label = "Life Quote",
        emailSubject = "Life Insurance Quote Request",
        hint = "Share the type of life coverage you are considering and any timing details."
    ),
    PolicyService(
        label = "Policy Service",
        emailSubject = "Policy Service Request",
        hint = "Let us know whether you need a certificate, billing help, ID cards, or a policy change."
    ),
    GeneralContact(
        label = "General Contact",
        emailSubject = "General Contact Request",
        hint = "Ask a question or tell the office what you need help with."
    )
}

internal data class CoverageGroup(
    val title: String,
    val summary: String,
    val items: List<String>,
    val icon: ImageVector,
    val ctaLabel: String,
    val ctaUrl: String,
    val requestType: IntakeRequestType
)

internal data class ActionItem(
    val title: String,
    val summary: String,
    val icon: ImageVector,
    val buttonLabel: String = "Open"
)

internal data class Review(
    val quote: String,
    val author: String
)

internal val coverageGroups = listOf(
    CoverageGroup(
        title = "Personal Insurance",
        summary = "Protection for household property, vehicles, liability, and life-stage needs.",
        items = listOf("Home", "Auto", "Umbrella", "Motorcycle", "Flood", "Life", "Renters"),
        icon = Icons.Outlined.Home,
        ctaLabel = "Start a personal quote",
        ctaUrl = PersonalInsuranceUrl,
        requestType = IntakeRequestType.PersonalQuote
    ),
    CoverageGroup(
        title = "Business Insurance",
        summary = "Coverage for operations, property, staff, fleets, and risk management.",
        items = listOf("Business owners", "General liability", "Commercial property", "Workers' comp", "Commercial bonds", "Cyber liability"),
        icon = Icons.Outlined.Business,
        ctaLabel = "Start a business quote",
        ctaUrl = BusinessInsuranceUrl,
        requestType = IntakeRequestType.BusinessQuote
    ),
    CoverageGroup(
        title = "Insurance by Industry",
        summary = "Coverage packages designed around trade-specific exposures.",
        items = listOf("Contractors", "Rental property", "Condo buildings", "Restaurants", "Trucking"),
        icon = Icons.Outlined.VerifiedUser,
        ctaLabel = "Talk with the agency",
        ctaUrl = IndustryInsuranceUrl,
        requestType = IntakeRequestType.BusinessQuote
    )
)

internal val homeQuickActions = listOf(
    ActionItem("Request Quote", "Start a native quote request inside the app.", Icons.Outlined.Description, "Start"),
    ActionItem("Client Portal", "Open the Abel client portal screen.", Icons.AutoMirrored.Outlined.OpenInNew, "Open"),
    ActionItem("Coverage Guide", "Browse personal, business, and industry options.", Icons.Outlined.Business, "Browse"),
    ActionItem("Contact Office", "Send a native contact request to the agency.", Icons.Outlined.Email, "Contact")
)

internal val serviceActions = listOf(
    ActionItem("Policy Service", "Start a service request instead of hunting through a web page.", Icons.Outlined.VerifiedUser, "Request"),
    ActionItem("Call Office", "Talk with the Buckhannon office directly.", Icons.Outlined.Call, "Call"),
    ActionItem("Agency Website", "Open the full Abel Insurance website.", Icons.Outlined.Language, "Open"),
    ActionItem("Email Office", "Draft an email to the office inbox.", Icons.Outlined.Email, "Email")
)

internal val homeReviews = listOf(
    Review("Excellent communication from a knowledgeable and friendly staff helped us secure a competitive rate for our insurance needs.", "Terri O."),
    Review("They were great helping us get our insurance coverage set up. They were prompt and professional.", "Kelly C."),
    Review("Wonderful company. Travis and Joyce have been awesome at finding the best coverage for us and helped to find coverage that is affordable.", "Sharla S.")
)