import { AppLayoutElement } from "@vaadin/vaadin-app-layout/src/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/theme/lumo/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle";
import "@vaadin/vaadin-checkbox/vaadin-checkbox";
import "@vaadin/vaadin-split-layout";
import "@vaadin/vaadin-tabs";
import { css, customElement, html, LitElement, property } from "lit-element";
import "../all-recipes";
import "../code-viewer";
import RecipeInfo from "../generated/com/vaadin/recipes/data/RecipeInfo";

@customElement("all-recipes-view")
export class AllRecipesView extends LitElement {
  @property({ type: Object })
  recipe: RecipeInfo = { howDoI: "", url: "", tags: [] };

  static get styles() {
    return css`=

    :host {
      height: 100%;
    }

      .main {
        height: 100%;
        background-color: red;
        display: flex;
        flex-direction: column;
        background: #0000;
      }

      .wrap {
        max-width: 1300px;
        width: 100%;
        margin: 0 auto;
        padding: 0 var(--lumo-space-l);
      }

      header {
        background: var(--lumo-shade);
        color: #fff;
        height: 50px;
        flex-shrink: 0;
        display: flex;
        align-items: center;

      }

      header .app-title {
        font-size: 1rem;
      }

      .content {
        flex: 1 1 auto;
        overflow: auto;
      }

      /* All recipes*/
      .all-recipes {
        display: flex;
      }

      .tag {
        padding: 0.3em;
        margin-right: 0.3em;
        font-size: var(--lumo-font-size-s);
        background: lightgrey;
        border-radius: 4px;
      }

      .side-bar {
        width: 250px;
        flex-shrink: 0;
      }

      .side-bar vaadin-checkbox {
        width: 100%;
      }

      .main-content {
        flex-grow: 1;
        border-left: 1px solid var(--lumo-shade-10pct);
        border-right: 1px solid var(--lumo-shade-10pct);
      }


      .examplewrapper,
      // code-viewer {
      //   flex: 1;
      // }
      // .layout {
      //   height: 100%;
      // }

    `;
  }

  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <vaadin-drawer-toggle
          slot="navbar touch-optimized"
        ></vaadin-drawer-toggle>
        <span slot="navbar touch-optimized">
          ${this.recipe.tags?.map(
            (tag) => html`<span class="tag">${tag}</span>`
          )}<span class="title">How do I ${this.recipe.howDoI}</span>
        </span>
        <all-recipes slot="drawer"></all-recipes>
        <vaadin-split-layout class="layout" orientation="vertical">
          <div class="examplewrapper">
            <div>${this.recipe.description}</div>
            <slot></slot>
          </div>
          <code-viewer .files=${this.recipe.sourceFiles || []}></code-viewer>
        </vaadin-split-layout>
      </vaadin-app-layout>

      <!--<div class="main">-->
        <!--<header>-->
          <!--<div class="wrap">-->
              <!--<h1 class="app-title">Cookbook</h1>-->
          <!--</div>   -->
        <!--</header>-->
        <!--<div class="content">-->
          <!--<div class="wrap">-->
            <!--<div class="all-recipes">-->
                <!--<div class="side-bar">-->
                    <!--<h3>Filter by tags</h3>-->
                    <!--<vaadin-checkbox>Ui</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Data</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Themes</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Tools</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Miscellaneous</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Web components</vaadin-checkbox>-->
                    <!--<vaadin-checkbox>Official Vaadin</vaadin-checkbox>-->
                <!--</div>-->
                <!--<div class="main-content">-->
                    <!--<all-recipes></all-recipes>-->
                <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    `;
  }

  private _routerLocationChanged() {
    AppLayoutElement.dispatchCloseOverlayDrawerEvent();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "vaadin-router-location-changed",
      this._routerLocationChanged
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "vaadin-router-location-changed",
      this._routerLocationChanged
    );
  }
}
