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
    memoItmBody
    memoItmTop
    memoItmMin
    memoItmBtn
    memoItmTxt
    memoDiv
    memoContents

    static #seq = 0;

    static get getSeq() {
        return this.#seq = seq;
    }

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
            .setStyleStr('width: 100')
            .builder();             
    }

}



