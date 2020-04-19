﻿(function () {
    function d(a, b) {
        j.call(this, a, b); this.actualConfig = this.originalConfig = this.removedButtons = null; this.emptyVisible = !1; this.state = "edit"; this.toolbarButtons = [{ text: { active: "Hide empty toolbar groups", inactive: "Show empty toolbar groups" }, group: "edit", position: "left", cssClass: "button-a-soft", clickCallback: function (a, b) { a[a.hasClass("button-a-background") ? "removeClass" : "addClass"]("button-a-background"); this._toggleVisibilityEmptyElements(); this.emptyVisible ? a.setText(b.text.active) : a.setText(b.text.inactive) } },
        { text: "Add row separator", group: "edit", position: "left", cssClass: "button-a-soft", clickCallback: function () { this._addSeparator() } }, { text: "Select config", group: "config", position: "left", cssClass: "button-a-soft", clickCallback: function () { this.configContainer.findOne("textarea").$.select() } }, {
            text: "Back to configurator", group: "config", position: "right", cssClass: "button-a-background", clickCallback: function () {
                if ("paste" === this.state) {
                    var a = this.configContainer.findOne("textarea").getValue(); (a = d.evaluateToolbarGroupsConfig(a)) ?
                        this.setConfig(a) : alert("Your pasted config is wrong.")
                } this.state = "edit"; this._showConfigurationTool(); this.showToolbarBtnsByGroupName(this.state)
            }
        }, { text: 'Get toolbar <span class="highlight">config</span>', group: "edit", position: "right", cssClass: "button-a-background icon-pos-left icon-download", clickCallback: function () { this.state = "config"; this._showConfig(); this.showToolbarBtnsByGroupName(this.state) } }]; this.cachedActiveElement = null
    } var j = ToolbarConfigurator.AbstractToolbarModifier; ToolbarConfigurator.ToolbarModifier =
        d; d.prototype = Object.create(ToolbarConfigurator.AbstractToolbarModifier.prototype); d.prototype.getActualConfig = function () { var a = j.prototype.getActualConfig.call(this); if (a.toolbarGroups) for (var b = a.toolbarGroups.length, c = 0; c < b; c += 1)a.toolbarGroups[c] = d.parseGroupToConfigValue(a.toolbarGroups[c]); return a }; d.prototype._onInit = function (a, b, c) {
            c = !0 === c; j.prototype._onInit.call(this, void 0, b); this.removedButtons = []; c ? this.removedButtons = this.actualConfig.removeButtons ? this.actualConfig.removeButtons.split(",") :
                [] : "removeButtons" in this.originalConfig ? this.removedButtons = this.originalConfig.removeButtons ? this.originalConfig.removeButtons.split(",") : [] : (this.originalConfig.removeButtons = "", this.removedButtons = []); this.actualConfig.toolbarGroups || (this.actualConfig.toolbarGroups = this.fullToolbarEditor.getFullToolbarGroupsConfig()); this._fixGroups(this.actualConfig); this._calculateTotalBtns(); this._createModifier(); this._refreshMoveBtnsAvalibility(); this._refreshBtnTabIndexes(); "function" === typeof a && a(this.mainContainer)
        };
    d.prototype._showConfigurationTool = function () { this.configContainer.addClass("hidden"); this.modifyContainer.removeClass("hidden") }; d.prototype._showConfig = function () {
        var a = this.getActualConfig(), b, c; if (a.toolbarGroups) {
            b = a.toolbarGroups; for (var e = this.cfg.trimEmptyGroups, f = [], g = b.length, k = 0; k < g; k++) {
                var h = b[k]; if ("/" === h) f.push("'/'"); else {
                    if (e) for (var i = h.groups.length; i--;)0 === d.getTotalSubGroupButtonsNumber(h.groups[i], this.fullToolbarEditor) && h.groups.splice(i, 1); e && 0 === h.groups.length || f.push(j.stringifyJSONintoOneLine(h,
                        { addSpaces: !0, noQuotesOnKey: !0, singleQuotes: !0 }))
                }
            } b = "\n\t\t" + f.join(",\n\t\t")
        } a.removeButtons && (c = a.removeButtons); a = ['<textarea class="configCode" readonly>CKEDITOR.editorConfig = function( config ) {\n', b ? "\tconfig.toolbarGroups = [" + b + "\n\t];" : "", c ? "\n\n" : "", c ? "\tconfig.removeButtons = '" + c + "';" : "", "\n};</textarea>"].join(""); this.modifyContainer.addClass("hidden"); this.configContainer.removeClass("hidden"); this.configContainer.setHtml(a)
    }; d.prototype._toggleVisibilityEmptyElements = function () {
        this.modifyContainer.hasClass("empty-visible") ?
        (this.modifyContainer.removeClass("empty-visible"), this.emptyVisible = !1) : (this.modifyContainer.addClass("empty-visible"), this.emptyVisible = !0); this._refreshMoveBtnsAvalibility()
    }; d.prototype._createModifier = function () {
        function a() { b._highlightGroup(this.data("name")) } var b = this; j.prototype._createModifier.call(this); this.modifyContainer.setHtml(this._toolbarConfigToListString()); var c = this.modifyContainer.find('li[data-type="group"]'); this.modifyContainer.on("mouseleave", function () { this._dehighlightActiveToolGroup() },
            this); for (var e = c.count(), f = 0; f < e; f += 1)c.getItem(f).on("mouseenter", a); CKEDITOR.document.on("keypress", function (a) { var a = a.data.$.keyCode, a = 32 === a || 13 === a, c = new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); c.getAscendant(function (a) { return a.$ === b.mainContainer.$ }) && a && "button" === c.data("type") && c.findOne("input").$.click() }); this.modifyContainer.on("click", function (a) {
                var c = a.data.$, e = new CKEDITOR.dom.element(c.target || c.srcElement); if (a = d.getGroupOrSeparatorLiAncestor(e)) {
                b.cachedActiveElement =
                    document.activeElement; if (e.$ instanceof HTMLInputElement) b._handleCheckboxClicked(e); else if (e.$ instanceof HTMLButtonElement && (c.preventDefault ? c.preventDefault() : c.returnValue = !1, (c = b._handleAnchorClicked(e.$)) && "remove" == c.action)) return; c = a.data("type"); a = a.data("name"); b._setActiveElement(c, a); b.cachedActiveElement && b.cachedActiveElement.focus()
                }
            }); this.toolbarContainer || (this._createToolbar(), this.toolbarContainer.insertBefore(this.mainContainer.getChildren().getItem(0))); this.showToolbarBtnsByGroupName("edit");
        this.configContainer || (this.configContainer = new CKEDITOR.dom.element("div"), this.configContainer.addClass("configContainer"), this.configContainer.addClass("hidden"), this.mainContainer.append(this.configContainer)); return this.mainContainer
    }; d.prototype.showToolbarBtnsByGroupName = function (a) { if (this.toolbarContainer) for (var b = this.toolbarContainer.find("button"), c = b.count(), e = 0; e < c; e += 1) { var d = b.getItem(e); d.data("group") == a ? d.removeClass("hidden") : d.addClass("hidden") } }; d.parseGroupToConfigValue =
        function (a) { if ("separator" == a.type) return "/"; var b = a.groups, c = b.length; delete a.totalBtns; for (var e = 0; e < c; e += 1)b[e] = b[e].name; return a }; d.getGroupOrSeparatorLiAncestor = function (a) { return a.$ instanceof HTMLLIElement && "group" == a.data("type") ? a : d.getFirstAncestor(a, function (a) { a = a.data("type"); return "group" == a || "separator" == a }) }; d.prototype._setActiveElement = function (a, b) {
        this.currentActive && this.currentActive.elem.removeClass("active"); if (null === a) this._dehighlightActiveToolGroup(), this.currentActive =
            null; else { var c = this.mainContainer.findOne('ul[data-type=table-body] li[data-type="' + a + '"][data-name="' + b + '"]'); c.addClass("active"); this.currentActive = { type: a, name: b, elem: c }; "group" == a && this._highlightGroup(b); "separator" == a && this._dehighlightActiveToolGroup() }
        }; d.prototype.getActiveToolGroup = function () { return this.editorInstance.container ? this.editorInstance.container.findOne(".cke_toolgroup.active, .cke_toolbar.active") : null }; d.prototype._dehighlightActiveToolGroup = function () {
            var a = this.getActiveToolGroup();
            a && a.removeClass("active"); this.editorInstance.container && this.editorInstance.container.removeClass("some-toolbar-active")
        }; d.prototype._highlightGroup = function (a) {
            this.editorInstance.container && (a = this.getFirstEnabledButtonInGroup(a), a = this.editorInstance.container.findOne(".cke_button__" + a + ", .cke_combo__" + a), this._dehighlightActiveToolGroup(), this.editorInstance.container && this.editorInstance.container.addClass("some-toolbar-active"), a && (a = d.getFirstAncestor(a, function (a) { return a.hasClass("cke_toolbar") })) &&
                a.addClass("active"))
        }; d.prototype.getFirstEnabledButtonInGroup = function (a) { var b = this.actualConfig.toolbarGroups, a = this.getGroupIndex(a), b = b[a]; if (-1 === a) return null; for (var a = b.groups ? b.groups.length : 0, c = 0; c < a; c += 1) { var e = this.getFirstEnabledButtonInSubgroup(b.groups[c].name); if (e) return e } return null }; d.prototype.getFirstEnabledButtonInSubgroup = function (a) { for (var b = (a = this.fullToolbarEditor.buttonsByGroup[a]) ? a.length : 0, c = 0; c < b; c += 1) { var e = a[c].name; if (!this.isButtonRemoved(e)) return e } return null };
    d.prototype._handleCheckboxClicked = function (a) { var b = a.getAscendant("li").data("name"); a.$.checked ? this._removeButtonFromRemoved(b) : this._addButtonToRemoved(b) }; d.prototype._handleAnchorClicked = function (a) {
        var a = new CKEDITOR.dom.element(a), b = a.getAscendant("li"), c = b.getAscendant("ul"), e = b.data("type"), d = b.data("name"), g = a.data("direction"), k = "up" === g ? b.getPrevious() : b.getNext(), h; if (a.hasClass("disabled")) return null; if (a.hasClass("remove")) return b.remove(), this._removeSeparator(b.data("name")),
            this._setActiveElement(null), { action: "remove" }; if (!a.hasClass("move") || !k) return { action: null }; if ("group" === e || "separator" === e) h = this._moveGroup(g, d); "subgroup" === e && (h = b.getAscendant("li").data("name"), h = this._moveSubgroup(g, h, d)); "up" === g && b.insertBefore(c.getChild(h)); "down" === g && b.insertAfter(c.getChild(h)); for (var i; b = "up" === g ? b.getPrevious() : b.getNext();)if (this.emptyVisible || !b.hasClass("empty")) { i = b; break } i || (this.cachedActiveElement = a.getParent().findOne('[data-direction="' + ("up" === g ? "down" :
                "up") + '"]')); this._refreshMoveBtnsAvalibility(); this._refreshBtnTabIndexes(); return { action: "move" }
    }; d.prototype._refreshMoveBtnsAvalibility = function () { function a(a) { var c = a.count(); for (d = 0; d < c; d += 1)b._disableElementsInList(a.getItem(d)) } for (var b = this, c = this.mainContainer.find("ul[data-type=table-body] li > p > span > button.move.disabled"), e = c.count(), d = 0; d < e; d += 1)c.getItem(d).removeClass("disabled"); a(this.mainContainer.find("ul[data-type=table-body]")); a(this.mainContainer.find("ul[data-type=table-body] > li > ul")) };
    d.prototype._refreshBtnTabIndexes = function () { for (var a = this.mainContainer.find('[data-tab="true"]'), b = a.count(), c = 0; c < b; c++) { var e = a.getItem(c), d = e.hasClass("disabled"); e.setAttribute("tabindex", d ? -1 : c) } }; d.prototype._disableElementsInList = function (a) {
        function b(a) { return !a.hasClass("empty") } if (a.getChildren().count()) {
            var c; this.emptyVisible ? (c = a.getFirst(), a = a.getLast()) : (c = a.getFirst(b), a = a.getLast(b)); if (c) var e = c.findOne('p button[data-direction="up"]'); if (a) var d = a.findOne('p button[data-direction="down"]');
            e && (e.addClass("disabled"), e.setAttribute("tabindex", "-1")); d && (d.addClass("disabled"), d.setAttribute("tabindex", "-1"))
        }
    }; d.prototype.getGroupIndex = function (a) { for (var b = this.actualConfig.toolbarGroups, c = b.length, d = 0; d < c; d += 1)if (b[d].name === a) return d; return -1 }; d.prototype._addSeparator = function () {
        var a = this._determineSeparatorToAddIndex(), b = d.createSeparatorLiteral(), c = CKEDITOR.dom.element.createFromHtml(d.getToolbarSeparatorString(b)); this.actualConfig.toolbarGroups.splice(a, 0, b); c.insertBefore(this.modifyContainer.findOne("ul[data-type=table-body]").getChild(a));
        this._setActiveElement("separator", b.name); this._refreshMoveBtnsAvalibility(); this._refreshBtnTabIndexes(); this._refreshEditor()
    }; d.prototype._removeSeparator = function (a) { this.actualConfig.toolbarGroups.splice(CKEDITOR.tools.indexOf(this.actualConfig.toolbarGroups, function (b) { return "separator" == b.type && b.name == a }), 1); this._refreshMoveBtnsAvalibility(); this._refreshBtnTabIndexes(); this._refreshEditor() }; d.prototype._determineSeparatorToAddIndex = function () {
        return !this.currentActive ? 0 : ("group" == this.currentActive.elem.data("type") ||
            "separator" == this.currentActive.elem.data("type") ? this.currentActive.elem : this.currentActive.elem.getAscendant("li")).getIndex()
    }; d.prototype._moveElement = function (a, b, c) { function e(a) { return a.totalBtns || "separator" == a.type } c = this.emptyVisible ? "down" == c ? b + 1 : b - 1 : d.getFirstElementIndexWith(a, b, c, e); return d.moveTo(c - b, a, b) }; d.prototype._moveGroup = function (a, b) {
        var c = this._moveElement(this.actualConfig.toolbarGroups, this.getGroupIndex(b), a); this._refreshMoveBtnsAvalibility(); this._refreshBtnTabIndexes();
        this._refreshEditor(); return c
    }; d.prototype._moveSubgroup = function (a, b, c) { var b = this.actualConfig.toolbarGroups[this.getGroupIndex(b)], d = CKEDITOR.tools.indexOf(b.groups, function (a) { return a.name == c }), a = this._moveElement(b.groups, d, a); this._refreshEditor(); return a }; d.prototype._calculateTotalBtns = function () { for (var a = this.actualConfig.toolbarGroups, b = a.length; b--;) { var c = a[b], e = d.getTotalGroupButtonsNumber(c, this.fullToolbarEditor); "separator" != c.type && (c.totalBtns = e) } }; d.prototype._addButtonToRemoved =
        function (a) { if (-1 != CKEDITOR.tools.indexOf(this.removedButtons, a)) throw "Button already added to removed"; this.removedButtons.push(a); this.actualConfig.removeButtons = this.removedButtons.join(","); this._refreshEditor() }; d.prototype._removeButtonFromRemoved = function (a) { a = CKEDITOR.tools.indexOf(this.removedButtons, a); if (-1 === a) throw "Trying to remove button from removed, but not found"; this.removedButtons.splice(a, 1); this.actualConfig.removeButtons = this.removedButtons.join(","); this._refreshEditor() }; d.parseGroupToConfigValue =
            function (a) { if ("separator" == a.type) return "/"; var b = a.groups, c = b.length; delete a.totalBtns; for (var d = 0; d < c; d += 1)b[d] = b[d].name; return a }; d.getGroupOrSeparatorLiAncestor = function (a) { return a.$ instanceof HTMLLIElement && "group" == a.data("type") ? a : d.getFirstAncestor(a, function (a) { a = a.data("type"); return "group" == a || "separator" == a }) }; d.createSeparatorLiteral = function () { return { type: "separator", name: "separator" + CKEDITOR.tools.getNextNumber() } }; d.prototype._toolbarConfigToListString = function () {
                for (var a = this.actualConfig.toolbarGroups ||
                    [], b = '<ul data-type="table-body">', c = a.length, e = 0; e < c; e += 1)var f = a[e], b = "separator" === f.type ? b + d.getToolbarSeparatorString(f) : b + this._getToolbarGroupString(f); return d.getToolbarHeaderString() + (b + "</ul>")
            }; d.prototype._getToolbarGroupString = function (a) {
                var b = a.groups, c; c = "" + ['<li data-type="group" data-name="', a.name, '" ', a.totalBtns ? "" : 'class="empty"', ">"].join(""); c += d.getToolbarElementPreString(a) + "<ul>"; for (var a = b.length, e = 0; e < a; e += 1) { var f = b[e]; c += this._getToolbarSubgroupString(f, this.fullToolbarEditor.buttonsByGroup[f.name]) } return c +
                    "</ul></li>"
            }; d.getToolbarSeparatorString = function (a) { return ['<li data-type="', a.type, '" data-name="', a.name, '">', d.getToolbarElementPreString("row separator"), "</li>"].join("") }; d.getToolbarHeaderString = function () { return '<ul data-type="table-header"><li data-type="header"><p>Toolbars</p><ul><li><p>Toolbar groups</p><p>Toolbar group items</p></li></ul></li></ul>' }; d.getFirstAncestor = function (a, b) { for (var c = a.getParents(), d = c.length; d--;)if (b(c[d])) return c[d]; return null }; d.getFirstElementIndexWith =
                function (a, b, c, d) { for (; "up" === c ? b-- : ++b < a.length;)if (d(a[b])) return b; return -1 }; d.moveTo = function (a, b, c) { var d; -1 !== c && (d = b.splice(c, 1)[0]); a = c + a; b.splice(a, 0, d); return a }; d.getTotalSubGroupButtonsNumber = function (a, b) { var c = b.buttonsByGroup["string" == typeof a ? a : a.name]; return c ? c.length : 0 }; d.getTotalGroupButtonsNumber = function (a, b) { for (var c = 0, e = a.groups, f = e ? e.length : 0, g = 0; g < f; g += 1)c += d.getTotalSubGroupButtonsNumber(e[g], b); return c }; d.prototype._getToolbarSubgroupString = function (a, b) {
                    var c; c = "" +
                        ['<li data-type="subgroup" data-name="', a.name, '" ', a.totalBtns ? "" : 'class="empty" ', ">"].join(""); c += d.getToolbarElementPreString(a.name); c += "<ul>"; for (var e = b ? b.length : 0, f = 0; f < e; f += 1)c += this.getButtonString(b[f]); return c + "</ul></li>"
                }; d.prototype._getConfigButtonName = function (a) { var b = this.fullToolbarEditor.editorInstance.ui.items, c; for (c in b) if (b[c].name == a) return c; return null }; d.prototype.isButtonRemoved = function (a) { return -1 != CKEDITOR.tools.indexOf(this.removedButtons, this._getConfigButtonName(a)) };
    d.prototype.getButtonString = function (a) { var b = this.isButtonRemoved(a.name) ? "" : 'checked="checked"'; return ['<li data-tab="true" data-type="button" data-name="', this._getConfigButtonName(a.name), '"><label title="', a.label, '" ><input tabindex="-1"type="checkbox"', b, "/>", a.$.getOuterHtml(), "</label></li>"].join("") }; d.getToolbarElementPreString = function (a) {
        a = a.name ? a.name : a; return ['<p><span><button title="Move element upward" data-tab="true" data-direction="up" class="move icon-up-big"></button><button title="Move element downward" data-tab="true" data-direction="down" class="move icon-down-big"></button>',
            "row separator" == a ? '<button title="Remove element" data-tab="true" class="remove icon-trash"></button>' : "", a, "</span></p>"].join("")
    }; d.evaluateToolbarGroupsConfig = function (a) { return a = function (a) { var c = {}, d; try { d = eval("(" + a + ")") } catch (f) { try { d = eval(a) } catch (g) { return null } } return c.toolbarGroups && "number" === typeof c.toolbarGroups.length ? JSON.stringify(c) : d && "number" === typeof d.length ? JSON.stringify({ toolbarGroups: d }) : d && d.toolbarGroups ? JSON.stringify(d) : null }(a) }; return d
})();