class BaseElement extends HTMLElement{
    constructor(){
        super()
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if(mutation.type === "attributes"){
                    console.log("Attribute changed")
                    this.attributesChanged(mutation, mutation.attributeName)
                }
            })
        })
    }

    getStyle(css, importUrl = ""){
        if(typeof css !== "string"){
            console.error("Style type error")
            return
        }

        let style = document.createElement('style')
        let importCSS = (importUrl !== "") ? `@import url('${importUrl}');` : ""
        style.textContent = importCSS + css.replaceAll(" ", "").trim()
        return style
    }
    
    connectedCallback(){
        this.observer.observe(this, { attributes: true })
        this.Awake()
    }

    getAttr(attr, defaultValue = ""){ return (this.hasAttribute(attr)) ? this.getAttribute(attr) : defaultValue }
    setAttr(attr, value){ if(this.hasAttribute(attr)) this.setAttribute(attr, value) }

    attributesChanged(attr, name){
        if(attr === null || name === null){
            console.error("Attributes error")
            return
        }
    }

    create({element = "div", classname = "", id = "", src = "", alt = "", type = "", attr = {}, parent = null}){
        const el = document.createElement(element)
        if(classname !== "") el.setAttribute("class", classname)
        if(id !== "") el.setAttribute("id", id)
        if(src !== "") el.setAttribute("src", src)
        if(type !== "") el.setAttribute("type", type)
        if(alt !== "") el.setAttribute("alt", alt)
        if(Object.keys(attr).length > 0){
            for(const [key, value] of Object.entries(attr))
                el.setAttribute(key, value)
        }
        if(parent !== null) parent.appendChild(el)
        return el
    }

    Awake(){}
}