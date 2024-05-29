class MemoEle {
    tagNm; id=''; classList=[]; text=''; styleStr = '';

    static get Builder() {
        class MemoEleBuilder {
            tagNm; id=''; classList=[]; text=''; styleStr = '';

            setTagNm(tagNm) {
                this.tagNm = tagNm;
                return this;
            }

            setId(id) {
                this.id = id;
                return this;
            }
            setClassList(classList) {
                this.classList = classList;
                return this;
            }
            setText(text) {
                this.text = text;
                return this;
            }
            setStyleStr(styleStr) {
                this.styleStr = styleStr;
                return this;
            }

            builder() {return new MemoEle(this);}

        }
        return new MemoEleBuilder();
    }

    createElement() {
        let ele = document.createElement(this.tagNm);
        ele.id = this.id;
        if(this.classList.length > 0 ) {
            for(let classNm of this.classList) {
                ele.classList.add(classNm);
            }
        }
        if(this.text != '') ele.innerText = this.text;
        if(this.styleStr != '') ele.style = this.styleStr;
        return ele;
    }

    constructor(builder) {
        this.tagNm = builder.tagNm
        this.id = builder.id
        this.classList = builder.classList
        this.text = builder.text
        this.styleStr = builder.styleStr

        return this.createElement();
    }

}

class Memo {
    /**@type {HTMLElement} */
    memoItmBody
    /**@type {HTMLElement} */
    memoItmTop
    /**@type {HTMLElement} */
    memoItmMin
    /**@type {HTMLElement} */
    memoItmBtn
    /**@type {HTMLElement} */
    memoItmTxt
    /**@type {HTMLElement} */
    memoDiv
    /**@type {HTMLElement} */
    memoContents

    static #seq = 0;

    static get getSeq() {
        return this.#seq = seq;
    }

    /**@type {HTMLElement} */
    area
    memoState = {
        isMin: true,
        x: 0,
        y: 0,
        f: false
    }

    memoData = {};
    memoInfo = {
        url: '',
        txt: '',
        type: '',
        ttlByte: 0,
    }

    #createMemo() {
        this.memoItmBody = MemoEle.Builder
            .setTagNm('div')
            .setId('memoItmBody')
            .setClassList(['memoItmBody'])
            .builder();

        this.memoItmTop = MemoEle.Builder
            .setTagNm('div')
            .setId('memoItmTop')
            .setClassList(['memoItmTop'])
            .builder();  
            
        let memoItmTopTitle = MemoEle.Builder
            .setTagNm('span')
            .setText('메모')
            .setClassList(['memoItmTitle'])
            .builder();

        this.memoItmTop.appendChild(memoItmTopTitle);

        this.memoItmMin = MemoEle.Builder
            .setTagNm('span')
            .setId('memoItmMin')
            .setClassList(['memoItmMin'])
            .builder();

        this.memoItmBtn = MemoEle.Builder
            .setTagNm('div')
            .setId('memoItmBtn')
            .setClassList(['memoItmBtn'])
            .builder();
        
        this.memoItmBtn.innerHTML = `
                <span id="memoItmByte" style="height: 10px; float: right; text-align: center; padding: 2px; cursor: default; font-size: 12px; background-color: rgb(0,0,0,0);">
                <span id="memoItmByteVal" style="color: rgb(0, 209,16); font-weight: bold; font-size: 12px; background-color: rgb(0,0,0,0);">0</span>
                byte/4000byte  
            </span>
        `;

        this.memoContents = MemoEle.Builder
            .setTagNm('textarea')
            .setId('memoContents')
            .setClassList(['memoContents'])
            .builder();
        
        this.memoItmTxt = MemoEle.Builder
            .setTagNm('div')
            .setId('memoItmTxt')
            .setClassList(['memoItmTxt'])
            .builder();

        this.memoItmTop.appendChild(this.memoItmMin);
        this.memoItmTxt.appendChild(this.memoContents);

        this.memoItmBody.appendChild(this.memoItmTop);
        this.memoItmBody.appendChild(this.memoItmBtn);
        this.memoItmBody.appendChild(this.memoItmTxt);

        return this.memoItmBody;
    }

    #len(s) {
        let b,i,c;
        if(s){
            for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        }
        else {
            b = 0;
        }
        return b;
    }

    async #setMemoMin() {
        let _body = this.memoItmBody;
        this.memoState.isMin = true;
        this.memoItmMin.innerText = '□';

        this.memoItmBody.style.height = null;

        if(_body.classList.contains('maxMemo')) _body.classList.remove('maxMemo');

        this.memoItmBody.classList.add('minMemo');
    }

    #setMemoMax(param) {
        let _body = this.memoItmBody;
        this.memoState.isMin = false;
        this.memoItmMin.innerText = '_';

        this.memoItmBody.style.height = null;

        if(_body.classList.contains('minMemo')) _body.classList.remove('minMemo');

        this.memoItmBody.classList.add('maxMemo');

        if(typeof param == 'string' || typeof param == 'number') {
            this.memoContents.value = param;
        } else {
            throw new TypeError('type is not string or number');
        }
    }

    /**
     * 
     * @param {HTMLElement} area 
     */
    appendMemo(area) {  
        area.prepend(this.memoDiv);
    }

    async #postMemoTxt() {

    }

    async saveMemo() {

    }

    #addMemoEvent() {
        this.memoContents.addEventListener('keypress', e => {
            console.log(this.#len(e.target.value));
        });

        this.memoItmMin.addEventListener('click',e=>{
            if(this.memoState.isMin) {
                this.#setMemoMax();
            }else{
                this.#setMemoMin();
                document.documentElement.style.setProperty('--ani-heigth','12px');
            }
        });

        this.memoItmTop.addEventListener('mousedown',e=>{
            if(e.target.id == 'memoItmMin') return false;

            this.memoItmBody.style.border = '2px solid #00c4ff';
            this.memoItmBody.style.backgroundColor = '#ffffff8f';
            this.memoItmBody.style.opacity = '0.65';

            this.memoState = {
                ...this.memoState,
                x: e.screenX,
                y: e.screenY,
                f: true,
            }
        })

        document.addEventListener('mouseup', e=> {
            if(this.memoState.f == true) {
                this.memoItmBody.style.border = '2px solid #aaaaaa';
                this.memoItmBody.style.backgroundColor = '#ffffff';
                this.memoItmBody.style.opacity = '1';

                this.memoState = {
                    ...this.memoState,
                    x: 0,
                    y: 0,
                    f: false,
                }
            }
        })

        document.addEventListener('mousemove',e=>{
            if(this.memoState.f == true) {
                let {x,y} = this.memoState;
                let os = {
                    left: this.memoDiv.offsetLeft,
                    top: this.memoDiv.offsetTop,
                }

                let cx = os.left + (e.screenX - x);
                let cy = os.top + (e.screenY - y);

                cx = cx<0?0:cx;
                cy = cy<0?0:cy;

                let mx = this.area.getBoundingClientRect().width - this.memoDiv.offsetLeft;
                let my = this.area.getBoundingClientRect().height - this.memoDiv.offsetTop;

                cx = cx>=mx?mx:cx;
                cy = cy>=my?my:cy;

                this.memoItmBody.style.marginLeft = `${cx}px`;
                this.memoItmBody.style.marginTop = `${cy}px`;

                this.memoState.x = e.screenX;
                this.memoState.y = e.screenY;
            }
        })
    }

    #observer = new ResizeObserver((entris) => {
        for(let entry of entris) {
            const {width, height, bottom, top, right} = entry.contentRect;
            const {width:w, height:h, bottom:b, top:t, right:r, left:l} = this.memoDiv.getBoundingClientRect();
            const {width:mW, height:mH, bottom:mB, top:mT, right:mR} = this.area.getBoundingClientRect();
        
            this.memoItmBody.style.maxHeight = (mH - t) + 'px';
            this.memoItmBody.style.maxWidth = (mW - l) + 'px';

            if(!this.memoState.isMin) {
                this.memoData = {
                    ...this.memoData,
                    ...this.memoItmBody.getBoundingClientRect().toJSON(),
                }
            }
            this.memoItmTxt.style.height = height - 54 + 'px';
        }
    });

    constructor(area) {
        this.memoDiv = this.#createMemo();
        this.area = area;

        this.appendMemo(this.area);
        this.#addMemoEvent();

        this.#observer.observe(this.memoDiv);

        this.#postMemoTxt();
    }

}



