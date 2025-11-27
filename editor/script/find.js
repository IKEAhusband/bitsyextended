function FindTool(options) {
	options.mainElement.innerHTML = "";

	var spriteThumbnailRenderer = createSpriteThumbnailRenderer();
	var tileThumbnailRenderer = createTileThumbnailRenderer();
	var itemThumbnailRenderer = createItemThumbnailRenderer();
	var paletteThumbnailRenderer = createPaletteThumbnailRenderer();
	var roomThumbnailRenderer = createRoomThumbnailRenderer();

	// todo : try making a blip thumbnail renderer again later..
	// var blipThumbnailRenderer = createBlipThumbnailRenderer();

	var categoryDefinitions = [
		{
			id: "AVA",
			icon: "avatar",
			getIdList: function() { return ["A"]; },
			getCategoryName: function() {
				return localization.GetStringOrFallback("avatar_label", "avatar");
			},
			getItemName: function(id) {
				return localization.GetStringOrFallback("avatar_label", "avatar");
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("sprite_label", "sprite") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return (drawing.type === TileType.Avatar) && (drawing.id === id);
			},
			openTool: function(id) {
				paintTool.selectDrawing(sprite[id]);
				on_paint_avatar_ui_update();
				showPanel("paintPanel", "findPanel");
			},
			renderer: spriteThumbnailRenderer,
		},
		{
			id: "TIL",
			icon: "tile",
			getIdList: function() { return sortedTileIdList(); },
			getCategoryName: function() {
				return localization.GetStringOrFallback("tile_label", "tile");
			},
			getItemName: function(id) {
				return tile[id].name;
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("tile_label", "tile") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return (drawing.type === TileType.Tile) && (drawing.id === id);
			},
			openTool: function(id) {
				paintTool.selectDrawing(tile[id]);
				on_paint_tile_ui_update();
				showPanel("paintPanel", "findPanel");
			},
			renderer: tileThumbnailRenderer,
		},
		{
			id: "SPR",
			icon: "sprite",
			getIdList: function() {
				var idList = sortedSpriteIdList();
				idList.splice(idList.indexOf("A"), 1);
				return idList;
			},
			getCategoryName: function() {
				return localization.GetStringOrFallback("sprite_label", "sprite");
			},
			getItemName: function(id) {
				return sprite[id].name;
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("sprite_label", "sprite") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return (drawing.type === TileType.Sprite) && (drawing.id === id);
			},
			openTool: function(id) {
				paintTool.selectDrawing(sprite[id]);
				on_paint_sprite_ui_update();
				showPanel("paintPanel", "findPanel");
			},
			renderer: spriteThumbnailRenderer,
		},
		{
			id: "ITM",
			icon: "item",
			getIdList: function() { return sortedItemIdList(); },
			getCategoryName: function() {
				return localization.GetStringOrFallback("item_label", "item");
			},
			getItemName: function(id) {
				return item[id].name;
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("item_label", "item") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return (drawing.type === TileType.Item) && (drawing.id === id);
			},
			openTool: function(id) {
				paintTool.selectDrawing(item[id]);
				on_paint_item_ui_update();
				showPanel("paintPanel", "findPanel");
			},
			renderer: itemThumbnailRenderer,
		                },
                {
                        id: "ROOM",
                        icon: "room",
                        getIdList: function() { return sortedRoomIdList(); },
			getCategoryName: function() {
				return localization.GetStringOrFallback("room_label", "room");
			},
			getItemName: function(id) {
				return (id && room[id]) ? room[id].name : "";
			},
			setItemName: function(id, name) {
				if (room[id]) {
					room[id].name = name;
				}
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else if (id) {
					return localization.GetStringOrFallback("room_label", "room") + " " + id;
				}
				else {
					return localization.GetStringOrFallback("room_label", "room");
				}
			},
			isItemSelected: function(id) {
				return (roomTool != undefined) && roomTool.getSelected() === id;
			},
			openTool: function(id) {
                                selectRoom(id);
                                showPanel("roomPanel", "findPanel");
                        },
                        renderer: roomThumbnailRenderer,
                },
                {
                        id: "FAV",
                        icon: "about",
                        getIdList: function() { return getFavoriteDrawings(); },
                        getItemId: function(favorite) { return favorite.id; },
                        getCategoryName: function() {
                                return "favourite";
                        },
                        getItemName: function(favorite) {
                                return getFavoriteDrawingName(favorite);
                        },
                        getItemDescription: function(favorite, short) {
                                var label = tileTypeToString(favorite.type);

                                if (favorite.type === TileType.Tile) {
                                        label = localization.GetStringOrFallback("tile_label", "tile");
                                }
                                else if (favorite.type === TileType.Sprite) {
                                        label = localization.GetStringOrFallback("sprite_label", "sprite");
                                }
                                else if (favorite.type === TileType.Item) {
                                        label = localization.GetStringOrFallback("item_label", "item");
                                }

                                return short ? favorite.id : label + " " + favorite.id;
                        },
                        isItemSelectedWithData: function(favorite) {
                                return drawing && drawing.type === favorite.type && drawing.id === favorite.id;
                        },
                        openToolWithData: function(favorite) {
                                selectFavoriteDrawing(favorite);
                                showPanel("paintPanel", "findPanel");
                        },
                        getRenderer: function(favorite) { return getFavoriteThumbnailRenderer(favorite.type); },
                        getItemIcon: function(favorite) { return tileTypeToString(favorite.type); },
                },
                {
                        id: "PAL",
                        icon: "colors",
                        getIdList: function() { return sortedPaletteIdList(); },
                        getCategoryName: function() {
				return localization.GetStringOrFallback("palette_tool_name", "colors");
			},
			getItemName: function(id) {
				return palette[id].name;
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("palette_label", "palette") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return id === selectedColorPal();
			},
			openTool: function(id) {
				paletteTool.Select(id);
				showPanel("colorsPanel", "findPanel");
			},
			renderer: paletteThumbnailRenderer,
		},
		{
			id: "DLG",
			icon: "dialog",
			getIdList: function() { return [titleDialogId].concat(sortedDialogIdList()); },
			getCategoryName: function() {
				return localization.GetStringOrFallback("dialog_tool_name", "dialog");
			},
			getItemName: function(id) {
				return dialog[id].name;
			},
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else {
					return localization.GetStringOrFallback("dialog_tool_name", "dialog") + " " + id;
				}
			},
			isItemSelected: function(id) {
				return id === curDialogEditorId;
			},
			openTool: function(id) {
				openDialogTool(id);
				showPanel("dialogPanel", "findPanel");
			},
		},
		{
			id: "TUNE",
			icon: "tune",
			getIdList: function() { return sortedBase36IdList(tune); },
			getCategoryName: function() { return localization.GetStringOrFallback("tune_tool", "tune"); },
			getItemName: function(id) { return (id && tune[id]) ? tune[id].name : ""; },
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else if (id) {
					// todo : localize
					return "tune " + id;
				}
				else {
					return "tune";
				}
			},
			isItemSelected: function(id) { return tuneTool && id === tuneTool.getSelected(); },
			openTool: function(id) {
				tuneTool.select(id);
				tuneTool.show("findPanel");
			},
			setItemName: function(id, name) {
				if (tune[id]) {
					tune[id].name = name;
				}
			},
		},
		{
			id: "BLIP",
			icon: "blip",
			getIdList: function() { return sortedBase36IdList(blip); },
			getCategoryName: function() { return localization.GetStringOrFallback("blip_sfx", "blip"); },
			getItemName: function(id) { return (id && blip[id]) ? blip[id].name : ""; },
			getItemDescription: function(id, short) {
				if (short) {
					return id;
				}
				else if (id) {
					// todo : localize
					return "blip " + id;
				}
				else {
					return "blip";
				}
			},
			isItemSelected: function(id) { return blipTool && id === blipTool.getSelected(); },
			openTool: function(id) {
				blipTool.select(id);
				blipTool.show("findPanel");
			},
			setItemName: function(id, name) {
				if (blip[id]) {
					blip[id].name = name;
				}
			},
			// todo : make better blip thumbnail renderer
			// renderer: blipThumbnailRenderer
		},
	];

	var curFilter = "ALL";
	var curSearchText = "";

	var searchGroup = createGroupElement();

	searchGroup.appendChild(createLabelElement({
		icon: "search",
		style: "badge",
	}));

	searchGroup.appendChild(createTextInputElement({
		placeholder: "find by name or ID", // todo : localize
		style: "with-badge",
		onchange: function(e) {
			curSearchText = e.target.value;
			GenerateItems();
		},
	}));

	options.mainElement.appendChild(searchGroup);

	var filterTabList = [
		{
			text: localization.GetStringOrFallback("find_all", "all"),
			value: "ALL",
			icon: "game_data",
		},
	];

	for (var i = 0; i < categoryDefinitions.length; i++) {
		var category = categoryDefinitions[i];

		filterTabList.push({
			text: category.getCategoryName(),
			value: category.id,
			icon: category.icon,
		});
	}

	function selectCategory(categoryId) {
		curFilter = categoryId;
		GenerateItems();
	}

	function selectCategoryAndUpdateUI(categoryId) {
		selectCategory(categoryId);

		// hack! ..I'd prefer not to be directly manipulating the document here
		document.getElementById("findFilter-" + categoryId).checked = true;
	}

	var filterSelect = createRadioElement({
		name: "findFilter",
		value: curFilter,
		options: filterTabList,
		onclick: function(e) {
			selectCategory(e.target.value);
		},
	});

	filterSelect.classList.add("bitsy-menu-group");

	options.mainElement.appendChild(filterSelect);

	var scrollviewDiv = document.createElement("div");
	scrollviewDiv.classList.add("bitsy-menu-scrollview");

	options.mainElement.appendChild(scrollviewDiv);

	var scrollcontentDiv = document.createElement("div");
	scrollcontentDiv.classList.add("bitsy-menu-scrollcontent");
	scrollviewDiv.appendChild(scrollcontentDiv);

	var items = [];

        function GenerateItems() {
                items = [];

                function createOnClick(category, itemData, itemId) {
                        return function() {
                                if (category.openToolWithData) {
                                        category.openToolWithData(itemData);
                                }
                                else {
                                        category.openTool(itemId);
                                }

                                UpdateSelectedItems();
                        }
                }

                scrollcontentDiv.innerHTML = "";

                for (var i = 0; i < categoryDefinitions.length; i++) {
                        var category = categoryDefinitions[i];

                        if (curFilter === "ALL" || curFilter === category.id) {
                                var idList = category.getIdList()

                                for (var j = 0; j < idList.length; j++) {
                                        var itemData = idList[j];
                                        var itemId = category.getItemId ? category.getItemId(itemData) : itemData;

                                        var displayName = category.getItemName ? category.getItemName(itemData) : itemId;
                                        var tooltip = category.getItemDescription ? category.getItemDescription(itemData) : itemId;
                                        if (displayName === null || displayName === undefined) {
                                                if (category.getItemDescription) {
                                                        displayName = category.getItemDescription(itemData, true);
                                                }
                                                else {
                                                        displayName = "" + itemId;
                                                }
                                        }
                                        else if (category.getItemDescription) {
                                                tooltip = displayName + " (" + tooltip + ")";
                                        }

                                        var isSearchTextInName = (curSearchText === undefined || curSearchText === null ||
                                                curSearchText.length <= 0 || displayName.indexOf(curSearchText) != -1);

                                        if (isSearchTextInName) {
                                                var renderer = category.getRenderer ? category.getRenderer(itemData) : category.renderer;
                                                var icon = category.getItemIcon ? category.getItemIcon(itemData) : category.icon;
                                                var isSelectedFunc = category.isItemSelectedWithData ?
                                                        function() { return category.isItemSelectedWithData(itemData); } :
                                                        function(id) { return category.isItemSelected(itemId); };

                                                var thumbnailControl = new ThumbnailControl({
                                                                id: category.getThumbnailId ? category.getThumbnailId(itemData) : itemId,
                                                                renderer: renderer,
                                                                icon: icon,
                                                                text: displayName,
                                                                tooltip: tooltip,
                                                                isSelectedFunc: isSelectedFunc,
                                                                onclick: createOnClick(category, itemData, itemId),
                                                                renderOptions: { isAnimated: true },
                                                        });

                                                items.push(thumbnailControl);

                                                scrollcontentDiv.appendChild(thumbnailControl.GetElement());
                                        }
                                }
                        }
                }

                UpdateVisibleItems();
                UpdateSelectedItems();
        }

	function UpdateVisibleItems() {
		var viewportRect = scrollviewDiv.getBoundingClientRect();

		for (var i = 0; i < items.length; i++) {
			var thumbnailControl = items[i];
			var thumbRect = thumbnailControl.GetElement().getBoundingClientRect();
			var isInViewport = !(thumbRect.bottom < viewportRect.top || thumbRect.top > viewportRect.bottom);

			if (isInViewport) {
				thumbnailControl.LoadThumbnailImage();
			}
		}
	}

	function UpdateSelectedItems() {
		for (var i = 0; i < items.length; i++) {
			var thumbnailControl = items[i];
			thumbnailControl.UpdateSelected();
		}
	}

	events.Listen("game_data_change", function(event) {
		spriteThumbnailRenderer.InvalidateCache();
		tileThumbnailRenderer.InvalidateCache();
		itemThumbnailRenderer.InvalidateCache();
		paletteThumbnailRenderer.InvalidateCache();
		roomThumbnailRenderer.InvalidateCache();
		GenerateItems();
	});

        events.Listen("select_drawing", function(event) {
                UpdateSelectedItems();
        });

	        events.Listen("select_room", function(event) {
		spriteThumbnailRenderer.InvalidateCache();
		tileThumbnailRenderer.InvalidateCache();
		itemThumbnailRenderer.InvalidateCache();
		UpdateVisibleItems();
                UpdateSelectedItems();
        });

        events.Listen("drawing_favorite_toggled", function(event) {
                tileThumbnailRenderer.InvalidateCache();
                spriteThumbnailRenderer.InvalidateCache();
                itemThumbnailRenderer.InvalidateCache();
                GenerateItems();
        });


	// TODO : somehow palette selection works already??? find out why.. (is it triggering a game data refresh?)
	// events.Listen("select_palette", function(event) {
	// 	UpdateSelectedItems();
	// });

	events.Listen("select_dialog", function(event) {
		UpdateSelectedItems();
	});

	var scrollEndTimer = null;
	scrollviewDiv
		.addEventListener("scroll", function() {
			if (scrollEndTimer != null) {
				clearTimeout(scrollEndTimer);
			}

			scrollEndTimer = setTimeout(function() {
				UpdateVisibleItems();
			}, 100);
		});

	// init
	GenerateItems();

	this.SelectCategory = selectCategoryAndUpdateUI;

	this.getCategory = function(id) {
		for (var i = 0; i < categoryDefinitions.length; i++) {
			if (categoryDefinitions[i].id === id) {
				return categoryDefinitions[i];
			}
		}

		return null;
	};

	this.updateSelection = function() {
		GenerateItems();
	};

	this.updateThumbnails = function() {
		spriteThumbnailRenderer.InvalidateCache();
		tileThumbnailRenderer.InvalidateCache();
		itemThumbnailRenderer.InvalidateCache();
		paletteThumbnailRenderer.InvalidateCache();
		roomThumbnailRenderer.InvalidateCache();
		GenerateItems();
	};
}
