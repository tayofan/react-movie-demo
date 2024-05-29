import React from "react";

const Memo = () => {
    return (
        <div id="memoItmBody" className="memoItmBody maxMemo">
            <div id="memoItmTop" className="memoItmTop">
                <span id="" className="memoItmTitle">메모</span>
                <span id="memoItmMin" className="memoItmMin">_</span>
            </div>
            <div id="memoItmBtn" className="memoItmBtn">
                <span id="memoItmByte" >
                    <span id="memoItmByteVal">0</span>
                        byte/4000byte  
                </span>
            </div>
            <div id="memoItmTxt" className="memoItmTxt" >
                <textarea id="memoContents" className="memoContents"></textarea>
            </div>
        </div>
    )
}

export default Memo;  