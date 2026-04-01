package com.agentic.android.screens

import android.net.Uri
import android.util.Patterns
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.OpenInNew
import androidx.compose.material.icons.outlined.Call
import androidx.compose.material.icons.outlined.Description
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.Language
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material.icons.outlined.VerifiedUser
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.agentic.android.ContactRow
import com.agentic.android.FacebookUrl
import com.agentic.android.IntakeRequestType
import com.agentic.android.LinkedInUrl
import com.agentic.android.MainSiteUrl
import com.agentic.android.OfficeAddress
import com.agentic.android.OfficeEmail
import com.agentic.android.OfficeFaxDisplay
import com.agentic.android.OfficePhone
import com.agentic.android.OfficePhoneDisplay
import com.agentic.android.ResponsiveLayout
import com.agentic.android.ResponsivePair
import com.agentic.android.SectionCard
import com.agentic.android.SectionTitle
import com.agentic.android.launchEmailDraft
import com.agentic.android.launchUriIntent

@OptIn(ExperimentalLayoutApi::class)
@Composable
internal fun ContactScreen(
    layout: ResponsiveLayout,
    selectedRequestType: IntakeRequestType,
    onRequestTypeSelected: (IntakeRequestType) -> Unit
) {
    val context = LocalContext.current
    var firstName by rememberSaveable { mutableStateOf("") }
    var lastName by rememberSaveable { mutableStateOf("") }
    var companyName by rememberSaveable { mutableStateOf("") }
    var email by rememberSaveable { mutableStateOf("") }
    var phone by rememberSaveable { mutableStateOf("") }
    var details by rememberSaveable { mutableStateOf("") }
    var statusMessage by rememberSaveable { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        SectionTitle("Contact And Quote Request")

        SectionCard(title = "Office Details") {
            ContactRow(Icons.Outlined.LocationOn, OfficeAddress)
            ContactRow(Icons.Outlined.VerifiedUser, "Licensed in WV, VA, MD, OH, PA, and KY")
            ContactRow(Icons.Outlined.Call, OfficePhoneDisplay)
            ContactRow(Icons.Outlined.Email, OfficeEmail)
            ContactRow(Icons.Outlined.Description, "Fax: $OfficeFaxDisplay")

            ResponsivePair(
                stacked = layout.singleColumn,
                first = { modifier ->
                    OutlinedButton(onClick = { launchUriIntent(context, MainSiteUrl) }, modifier = modifier) {
                        Icon(Icons.Outlined.Language, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Website")
                    }
                },
                second = { modifier ->
                    OutlinedButton(onClick = { launchUriIntent(context, FacebookUrl) }, modifier = modifier) {
                        Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Facebook")
                    }
                }
            )
            ResponsivePair(
                stacked = layout.singleColumn,
                first = { modifier ->
                    OutlinedButton(onClick = { launchUriIntent(context, LinkedInUrl) }, modifier = modifier) {
                        Icon(Icons.AutoMirrored.Outlined.OpenInNew, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("LinkedIn")
                    }
                },
                second = { modifier ->
                    OutlinedButton(onClick = { launchUriIntent(context, "geo:0,0?q=${Uri.encode(OfficeAddress)}") }, modifier = modifier) {
                        Icon(Icons.Outlined.LocationOn, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Directions")
                    }
                }
            )
        }

        SectionCard(title = "Native Request Form") {
            Text(
                text = "Fill this out inside the app. We will open a pre-addressed email draft to the agency so you can review and send it.",
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "Please do not include sensitive personal, financial, or medical information in your message.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                IntakeRequestType.entries.forEach { type ->
                    FilterChip(
                        selected = selectedRequestType == type,
                        onClick = { onRequestTypeSelected(type) },
                        label = { Text(type.label) }
                    )
                }
            }

            Text(
                text = selectedRequestType.hint,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            ResponsivePair(
                stacked = !layout.formTwoColumn,
                first = { modifier ->
                    OutlinedTextField(
                        value = firstName,
                        onValueChange = { firstName = it },
                        label = { Text("First name") },
                        modifier = modifier
                    )
                },
                second = { modifier ->
                    OutlinedTextField(
                        value = lastName,
                        onValueChange = { lastName = it },
                        label = { Text("Last name") },
                        modifier = modifier
                    )
                }
            )

            ResponsivePair(
                stacked = !layout.formTwoColumn,
                first = { modifier ->
                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Email") },
                        modifier = modifier
                    )
                },
                second = { modifier ->
                    OutlinedTextField(
                        value = phone,
                        onValueChange = { phone = it },
                        label = { Text("Phone") },
                        modifier = modifier
                    )
                }
            )

            OutlinedTextField(
                value = companyName,
                onValueChange = { companyName = it },
                label = { Text("Company or household name (optional)") },
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = details,
                onValueChange = { details = it },
                label = { Text("How can we help?") },
                modifier = Modifier.fillMaxWidth(),
                minLines = 5
            )

            statusMessage?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.bodySmall,
                    color = if (it.startsWith("Ready")) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error
                )
            }

            ResponsivePair(
                stacked = layout.singleColumn,
                first = { modifier ->
                    Button(
                        onClick = {
                            val error = validateRequestForm(firstName, lastName, email, phone, details)
                            if (error != null) {
                                statusMessage = error
                            } else {
                                val body = buildString {
                                    appendLine("Request Type: ${selectedRequestType.label}")
                                    appendLine("Name: $firstName $lastName")
                                    appendLine("Email: $email")
                                    appendLine("Phone: $phone")
                                    if (companyName.isNotBlank()) appendLine("Company/Household: $companyName")
                                    appendLine()
                                    appendLine("Details:")
                                    appendLine(details.trim())
                                }
                                val opened = launchEmailDraft(
                                    context = context,
                                    subject = "${selectedRequestType.emailSubject} from Abel Insurance Group app",
                                    body = body
                                )
                                statusMessage = if (opened) {
                                    "Ready to send: your email app opened with this request prefilled."
                                } else {
                                    "No email app was available. Call $OfficePhoneDisplay or email $OfficeEmail instead."
                                }
                            }
                        },
                        modifier = modifier
                    ) {
                        Text("Open email draft")
                    }
                },
                second = { modifier ->
                    OutlinedButton(
                        onClick = { launchUriIntent(context, "tel:$OfficePhone") },
                        modifier = modifier
                    ) {
                        Text("Call office")
                    }
                }
            )
        }
    }
}

private fun validateRequestForm(
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    details: String
): String? {
    if (firstName.isBlank() || lastName.isBlank()) return "Please enter your full name."
    if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) return "Please enter a valid email address."
    if (phone.filter(Char::isDigit).length < 10) return "Please enter a phone number with at least 10 digits."
    if (details.trim().length < 12) return "Please add a bit more detail so the agency can respond effectively."
    return null
}