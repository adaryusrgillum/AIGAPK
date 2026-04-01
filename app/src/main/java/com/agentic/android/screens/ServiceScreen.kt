package com.agentic.android.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.agentic.android.ActionRow
import com.agentic.android.ClientPortalUrl
import com.agentic.android.IntakeRequestType
import com.agentic.android.MainSiteUrl
import com.agentic.android.OfficeEmail
import com.agentic.android.OfficePhone
import com.agentic.android.PortalWebView
import com.agentic.android.ResponsiveLayout
import com.agentic.android.SectionCard
import com.agentic.android.SectionTitle
import com.agentic.android.launchUriIntent
import com.agentic.android.serviceActions

@Composable
internal fun ServiceScreen(
    layout: ResponsiveLayout,
    onOpenRequest: (IntakeRequestType) -> Unit
) {
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        SectionTitle("Client Service")

        SectionCard(title = "Client Portal") {
            Text(
                text = "The client portal remains available for existing policy servicing, while quote and contact requests now stay native inside the app.",
                style = MaterialTheme.typography.bodyMedium
            )
            PortalWebView(url = ClientPortalUrl, height = layout.webViewHeight)
            OutlinedButton(onClick = { launchUriIntent(context, ClientPortalUrl) }, modifier = Modifier.fillMaxWidth()) {
                Text("Open portal externally")
            }
        }

        SectionCard(title = "Need Help Fast?") {
            ActionRow(
                left = serviceActions[0],
                right = serviceActions[1],
                stacked = layout.singleColumn,
                onLeftClick = { onOpenRequest(IntakeRequestType.PolicyService) },
                onRightClick = { launchUriIntent(context, "tel:$OfficePhone") }
            )
            ActionRow(
                left = serviceActions[2],
                right = serviceActions[3],
                stacked = layout.singleColumn,
                onLeftClick = { launchUriIntent(context, MainSiteUrl) },
                onRightClick = { launchUriIntent(context, "mailto:$OfficeEmail") }
            )
        }
    }
}