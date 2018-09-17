'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">IonicMap2 documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AddLoyaltyCardPageModule.html" data-type="entity-link">AddLoyaltyCardPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AddLoyaltyCardPageModule-ae7a83418ba60266def447412f5aa113"' : 'data-target="#xs-components-links-module-AddLoyaltyCardPageModule-ae7a83418ba60266def447412f5aa113"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AddLoyaltyCardPageModule-ae7a83418ba60266def447412f5aa113"' : 'id="xs-components-links-module-AddLoyaltyCardPageModule-ae7a83418ba60266def447412f5aa113"' }>
                                        <li class="link">
                                            <a href="components/AddLoyaltyCardPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddLoyaltyCardPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' : 'data-target="#xs-components-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' : 'id="xs-components-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' }>
                                        <li class="link">
                                            <a href="components/AddLoyaltyCardPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddLoyaltyCardPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FlashCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlashCardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ListPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MapPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MyApp.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyApp</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ProductPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResetPasswordPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ShopPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopPage</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SignUpPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpPage</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' : 'data-target="#xs-injectables-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' : 'id="xs-injectables-links-module-AppModule-849866f1233ce0545caf2ac620c10886"' }>
                                        <li class="link">
                                            <a href="injectables/AuthProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProfileProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ProfileProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShopApiProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ShopApiProvider</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ComponentsModule-7ef87e12f0f85d097446c4bf4f617f18"' : 'data-target="#xs-components-links-module-ComponentsModule-7ef87e12f0f85d097446c4bf4f617f18"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ComponentsModule-7ef87e12f0f85d097446c4bf4f617f18"' : 'id="xs-components-links-module-ComponentsModule-7ef87e12f0f85d097446c4bf4f617f18"' }>
                                        <li class="link">
                                            <a href="components/FlashCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlashCardComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LoginPageModule-b548317e8f80d55bfccc2702689d65a3"' : 'data-target="#xs-components-links-module-LoginPageModule-b548317e8f80d55bfccc2702689d65a3"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LoginPageModule-b548317e8f80d55bfccc2702689d65a3"' : 'id="xs-components-links-module-LoginPageModule-b548317e8f80d55bfccc2702689d65a3"' }>
                                        <li class="link">
                                            <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MapPageModule.html" data-type="entity-link">MapPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MapPageModule-086fdefd8713fd4be31a7a1b6b688dac"' : 'data-target="#xs-components-links-module-MapPageModule-086fdefd8713fd4be31a7a1b6b688dac"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MapPageModule-086fdefd8713fd4be31a7a1b6b688dac"' : 'id="xs-components-links-module-MapPageModule-086fdefd8713fd4be31a7a1b6b688dac"' }>
                                        <li class="link">
                                            <a href="components/MapPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProductPageModule.html" data-type="entity-link">ProductPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProductPageModule-9fe5f9164c2e1abcf39d27d6facddb58"' : 'data-target="#xs-components-links-module-ProductPageModule-9fe5f9164c2e1abcf39d27d6facddb58"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProductPageModule-9fe5f9164c2e1abcf39d27d6facddb58"' : 'id="xs-components-links-module-ProductPageModule-9fe5f9164c2e1abcf39d27d6facddb58"' }>
                                        <li class="link">
                                            <a href="components/ProductPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProfilePageModule.html" data-type="entity-link">ProfilePageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfilePageModule-1f2dca54ff44598ed5b43ea3d45c9331"' : 'data-target="#xs-components-links-module-ProfilePageModule-1f2dca54ff44598ed5b43ea3d45c9331"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-1f2dca54ff44598ed5b43ea3d45c9331"' : 'id="xs-components-links-module-ProfilePageModule-1f2dca54ff44598ed5b43ea3d45c9331"' }>
                                        <li class="link">
                                            <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ResetPasswordPageModule.html" data-type="entity-link">ResetPasswordPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ResetPasswordPageModule-adbd51403fa8af2b2df28dbe171f00dc"' : 'data-target="#xs-components-links-module-ResetPasswordPageModule-adbd51403fa8af2b2df28dbe171f00dc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ResetPasswordPageModule-adbd51403fa8af2b2df28dbe171f00dc"' : 'id="xs-components-links-module-ResetPasswordPageModule-adbd51403fa8af2b2df28dbe171f00dc"' }>
                                        <li class="link">
                                            <a href="components/ResetPasswordPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ShopPageModule.html" data-type="entity-link">ShopPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ShopPageModule-620139a62393f60c9c5a0cbf85589c88"' : 'data-target="#xs-components-links-module-ShopPageModule-620139a62393f60c9c5a0cbf85589c88"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ShopPageModule-620139a62393f60c9c5a0cbf85589c88"' : 'id="xs-components-links-module-ShopPageModule-620139a62393f60c9c5a0cbf85589c88"' }>
                                        <li class="link">
                                            <a href="components/ShopPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SignUpPageModule.html" data-type="entity-link">SignUpPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SignUpPageModule-16c30f5eaf5eefdb55e36a56df75f9f7"' : 'data-target="#xs-components-links-module-SignUpPageModule-16c30f5eaf5eefdb55e36a56df75f9f7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SignUpPageModule-16c30f5eaf5eefdb55e36a56df75f9f7"' : 'id="xs-components-links-module-SignUpPageModule-16c30f5eaf5eefdb55e36a56df75f9f7"' }>
                                        <li class="link">
                                            <a href="components/SignUpPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpPage</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/EmailValidator.html" data-type="entity-link">EmailValidator</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AuthProvider.html" data-type="entity-link">AuthProvider</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProfileProvider.html" data-type="entity-link">ProfileProvider</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ShopApiProvider.html" data-type="entity-link">ShopApiProvider</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Shop.html" data-type="entity-link">Shop</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
