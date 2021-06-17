/**
 * Provides the names of the theme-variables.
 */
export abstract class ThemeVariables
{
    /**
     * The names of the theme-variables.
     */
    private static variableNames: string[] = null;

    /**
     * Initializes a new instance of the {@link ThemeVariables `ThemeVariables`} class.
     */
    private constructor()
    { }

    /**
     * Gets the names of the theme-variables.
     */
    public static get Names(): string[]
    {
        if (this.variableNames === null)
        {
            this.variableNames = [
                "wcfLayoutMinWidth",
                "wcfLayoutMaxWidth",
                "pageLogo",
                "pageLogoWidth",
                "pageLogoHeight",
                "pageLogoMobile",
                "wcfFontSizeDefault",
                "wcfFontSizeSmall",
                "wcfFontSizeHeadline",
                "wcfFontSizeSection",
                "wcfFontSizeTitle",
                "useGoogleFont",
                "wcfFontFamilyGoogle",
                "wcfFontFamilyFallback",
                "wcfHeaderBackground",
                "wcfHeaderText",
                "wcfHeaderLink",
                "wcfHeaderLinkActive",
                "wcfHeaderSearchBoxBackground",
                "wcfHeaderSearchBoxText",
                "wcfHeaderSearchBoxPlaceholder",
                "wcfHeaderSearchBoxPlaceholderActive",
                "wcfHeaderSearchBoxBackgroundActive",
                "wcfHeaderSearchBoxTextActive",
                "wcfHeaderMenuBackground",
                "wcfHeaderMenuLinkBackground",
                "wcfHeaderMenuLinkBackgroundActive",
                "wcfHeaderMenuLink",
                "wcfHeaderMenuLinkActive",
                "wcfHeaderMenuDropdownBackground",
                "wcfHeaderMenuDropdownLink",
                "wcfHeaderMenuDropdownBackgroundActive",
                "wcfHeaderMenuDropdownLinkActive",
                "wcfNavigationBackground",
                "wcfNavigationText",
                "wcfNavigationLink",
                "wcfNavigationLinkActive",
                "wcfSidebarBackground",
                "wcfSidebarText",
                "wcfSidebarLink",
                "wcfSidebarLinkActive",
                "wcfSidebarDimmedText",
                "wcfSidebarDimmedLink",
                "wcfSidebarDimmedLinkActive",
                "wcfSidebarHeadlineText",
                "wcfSidebarHeadlineLink",
                "wcfSidebarHeadlineLinkActive",
                "wcfContentBackground",
                "wcfContentBorder",
                "wcfContentBorderInner",
                "wcfContentText",
                "wcfContentLink",
                "wcfContentLinkActive",
                "wcfContentContainerBackground",
                "wcfContentContainerBorder",
                "wcfContentDimmedText",
                "wcfContentDimmedLink",
                "wcfContentDimmedLinkActive",
                "wcfContentHeadlineBorder",
                "wcfContentHeadlineText",
                "wcfContentHeadlineLink",
                "wcfContentHeadlineLinkActive",
                "wcfTabularBoxBorderInner",
                "wcfTabularBoxHeadline",
                "wcfTabularBoxBackgroundActive",
                "wcfTabularBoxHeadlineActive",
                "wcfInputLabel",
                "wcfInputBackground",
                "wcfInputBorder",
                "wcfInputText",
                "wcfInputPlaceholder",
                "wcfInputPlaceholderActive",
                "wcfInputBackgroundActive",
                "wcfInputBorderActive",
                "wcfInputTextActive",
                "wcfInputDisabledBackground",
                "wcfInputDisabledBorder",
                "wcfInputDisabledText",
                "wcfButtonBackground",
                "wcfButtonText",
                "wcfButtonBackgroundActive",
                "wcfButtonTextActive",
                "wcfButtonPrimaryBackground",
                "wcfButtonPrimaryText",
                "wcfButtonPrimaryBackgroundActive",
                "wcfButtonPrimaryTextActive",
                "wcfButtonDisabledBackground",
                "wcfButtonDisabledText",
                "wcfEditorButtonBackground",
                "wcfEditorButtonBackgroundActive",
                "wcfEditorButtonText",
                "wcfEditorButtonTextActive",
                "wcfEditorButtonTextDisabled",
                "wcfDropdownBackground",
                "wcfDropdownBorderInner",
                "wcfDropdownText",
                "wcfDropdownLink",
                "wcfDropdownBackgroundActive",
                "wcfDropdownLinkActive",
                "wcfStatusInfoBackground",
                "wcfStatusInfoBorder",
                "wcfStatusInfoText",
                "wcfStatusInfoLink",
                "wcfStatusInfoLinkActive",
                "wcfStatusSuccessBackground",
                "wcfStatusSuccessBorder",
                "wcfStatusSuccessText",
                "wcfStatusSuccessLink",
                "wcfStatusSuccessLinkActive",
                "wcfStatusWarningBackground",
                "wcfStatusWarningBorder",
                "wcfStatusWarningText",
                "wcfStatusWarningLink",
                "wcfStatusWarningLinkActive",
                "wcfStatusErrorBackground",
                "wcfStatusErrorBorder",
                "wcfStatusErrorText",
                "wcfStatusErrorLink",
                "wcfStatusErrorLinkActive",
                "wcfFooterBoxBackground",
                "wcfFooterBoxText",
                "wcfFooterBoxLink",
                "wcfFooterBoxLinkActive",
                "wcfFooterBoxHeadlineText",
                "wcfFooterBoxHeadlineLink",
                "wcfFooterBoxHeadlineLinkActive",
                "wcfFooterBackground",
                "wcfFooterText",
                "wcfFooterLink",
                "wcfFooterLinkActive",
                "wcfFooterHeadlineText",
                "wcfFooterHeadlineLink",
                "wcfFooterHeadlineLinkActive",
                "wcfFooterCopyrightBackground",
                "wcfFooterCopyrightText",
                "wcfFooterCopyrightLink",
                "wcfFooterCopyrightLinkActive"
            ];
        }

        return this.variableNames;
    }
}
