/*
 * Author : Cedric Staces
 * URI : https://staces.be/
 * Description : Add a specific class to the element with attribut data-scrolling if the element who has the same attribute value data-section-scrolling is on the webpage's top
 * Version : 2.0
 */
export default function ScrollingMenuEffect(_class, _offsetTop = 75){
	if(!_class) return
	
	let sections = Array.from(document.querySelectorAll("*[data-section-scrolling]")).reverse()
	const menuClass = _class.replace(".","")
	const offsetTop = _offsetTop

	addEventListener("scroll", scrollingeffect, false)
	scrollingeffect()
	function scrollingeffect(){
		let docScroll = document.scrollingElement.scrollTop
		let isFind = false

		sections.forEach(el => {
			let menu = document.querySelector("*[data-scrolling='"+el.getAttribute("data-section-scrolling")+"']")
			if(!isFind && docScroll >= (el.offsetTop - offsetTop)){
				if(!menu.classList.contains(menuClass)) menu.classList.add(menuClass)
				isFind = true
			}
			else menu.classList.remove(menuClass)
		})
	}
}