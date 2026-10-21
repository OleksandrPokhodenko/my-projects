import "./main.min.js";
import { a as getDigFormat, c as slideDown, i as dataMediaQueries, u as slideUp } from "./common.min.js";
import "./blockhead.min.js";
/* empty css          */
/* empty css              */
/* empty css                */
//#region src/components/layout/showmore/showmore.js
function showMore() {
	const showMoreBlocks = document.querySelectorAll("[data-fls-showmore]");
	let showMoreBlocksRegular;
	let mdQueriesArray;
	if (showMoreBlocks.length) {
		showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function(item, index, self) {
			return !item.dataset.flsShowmoreMedia;
		});
		showMoreBlocksRegular.length && initItems(showMoreBlocksRegular);
		document.addEventListener("click", showMoreActions);
		window.addEventListener("resize", showMoreActions);
		mdQueriesArray = dataMediaQueries(showMoreBlocks, "flsShowmoreMedia");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach((mdQueriesItem) => {
				mdQueriesItem.matchMedia.addEventListener("change", function() {
					initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
			});
			initItemsMedia(mdQueriesArray);
		}
	}
	function initItemsMedia(mdQueriesArray) {
		mdQueriesArray.forEach((mdQueriesItem) => {
			initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		});
	}
	function initItems(showMoreBlocks, matchMedia) {
		showMoreBlocks.forEach((showMoreBlock) => {
			initItem(showMoreBlock, matchMedia);
		});
	}
	function initItem(showMoreBlock, matchMedia = false) {
		showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
		let showMoreContent = showMoreBlock.querySelectorAll("[data-fls-showmore-content]");
		let showMoreButton = showMoreBlock.querySelectorAll("[data-fls-showmore-button]");
		showMoreContent = Array.from(showMoreContent).filter((item) => item.closest("[data-fls-showmore]") === showMoreBlock)[0];
		showMoreButton = Array.from(showMoreButton).filter((item) => item.closest("[data-fls-showmore]") === showMoreBlock)[0];
		const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
		if (matchMedia.matches || !matchMedia) {
			if (hiddenHeight < getOriginalHeight(showMoreContent)) {
				slideUp(showMoreContent, 0, showMoreBlock.classList.contains("--showmore-active") ? getOriginalHeight(showMoreContent) : hiddenHeight);
				showMoreButton.hidden = false;
			} else {
				slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		} else {
			slideDown(showMoreContent, 0, hiddenHeight);
			showMoreButton.hidden = true;
		}
	}
	function getHeight(showMoreBlock, showMoreContent) {
		let hiddenHeight = 0;
		const showMoreType = showMoreBlock.dataset.flsShowmore ? showMoreBlock.dataset.flsShowmore : "size";
		const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;
		if (showMoreType === "items") {
			const showMoreTypeValue = showMoreContent.dataset.flsShowmoreContent ? showMoreContent.dataset.flsShowmoreContent : 3;
			const showMoreItems = showMoreContent.children;
			for (let index = 1; index < showMoreItems.length; index++) {
				const showMoreItem = showMoreItems[index - 1];
				const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
				const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;
				hiddenHeight += showMoreItem.offsetHeight + marginTop;
				if (index == showMoreTypeValue) break;
				hiddenHeight += marginBottom;
			}
			rowGap && (hiddenHeight += (showMoreTypeValue - 1) * rowGap);
		} else hiddenHeight = showMoreContent.dataset.flsShowmoreContent ? showMoreContent.dataset.flsShowmoreContent : 150;
		return hiddenHeight;
	}
	function getOriginalHeight(showMoreContent) {
		let parentHidden;
		let hiddenHeight = showMoreContent.offsetHeight;
		showMoreContent.style.removeProperty("height");
		if (showMoreContent.closest(`[hidden]`)) {
			parentHidden = showMoreContent.closest(`[hidden]`);
			parentHidden.hidden = false;
		}
		let originalHeight = showMoreContent.offsetHeight;
		parentHidden && (parentHidden.hidden = true);
		showMoreContent.style.height = `${hiddenHeight}px`;
		return originalHeight;
	}
	function showMoreActions(e) {
		const targetEvent = e.target;
		const targetType = e.type;
		if (targetType === "click") {
			if (targetEvent.closest("[data-fls-showmore-button]")) {
				const showMoreBlock = targetEvent.closest("[data-fls-showmore-button]").closest("[data-fls-showmore]");
				const showMoreContent = showMoreBlock.querySelector("[data-fls-showmore-content]");
				const showMoreSpeed = showMoreBlock.dataset.flsShowmoreButton ? showMoreBlock.dataset.flsShowmoreButton : "500";
				const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
				if (!showMoreContent.classList.contains("--slide")) {
					showMoreBlock.classList.contains("--showmore-active") ? slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
					showMoreBlock.classList.toggle("--showmore-active");
				}
			}
		} else if (targetType === "resize") {
			showMoreBlocksRegular && showMoreBlocksRegular.length && initItems(showMoreBlocksRegular);
			mdQueriesArray && mdQueriesArray.length && initItemsMedia(mdQueriesArray);
		}
	}
}
window.addEventListener("load", showMore);
//#endregion
//#region src/components/layout/digcounter/digcounter.js
function digitsCounter() {
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-fls-digcounter]");
		if (digitsCounters.length) digitsCounters.forEach((digitsCounter) => {
			if (digitsCounter.hasAttribute("data-fls-digcounter-go")) return;
			digitsCounter.setAttribute("data-fls-digcounter-go", "");
			digitsCounter.dataset.flsDigcounter = digitsCounter.innerHTML;
			digitsCounter.innerHTML = `0`;
			digitsCountersAnimate(digitsCounter);
		});
	}
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseFloat(digitsCounter.dataset.flsDigcounterSpeed) ? parseFloat(digitsCounter.dataset.flsDigcounterSpeed) : 1e3;
		const startValue = parseFloat(digitsCounter.dataset.flsDigcounter);
		const format = digitsCounter.dataset.flsDigcounterFormat ? digitsCounter.dataset.flsDigcounterFormat : " ";
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			const value = Math.floor(progress * (startPosition + startValue));
			digitsCounter.innerHTML = typeof digitsCounter.dataset.flsDigcounterFormat !== "undefined" ? getDigFormat(value, format) : value;
			if (progress < 1) window.requestAnimationFrame(step);
			else digitsCounter.removeAttribute("data-fls-digcounter-go");
		};
		window.requestAnimationFrame(step);
	}
	function digitsCounterAction(e) {
		const entry = e.detail.entry;
		const targetElement = entry.target;
		if (targetElement.querySelectorAll("[data-fls-digcounter]").length && !targetElement.querySelectorAll("[data-fls-watcher]").length && entry.isIntersecting) digitsCountersInit(targetElement.querySelectorAll("[data-fls-digcounter]"));
	}
	document.addEventListener("watcherCallback", digitsCounterAction);
}
document.querySelector("[data-fls-digcounter]") && window.addEventListener("load", digitsCounter);
//#endregion
