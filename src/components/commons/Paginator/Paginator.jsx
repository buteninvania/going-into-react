import a from "./paginator.module.css";
import React, {useState} from "react";

const Paginator = ({totalUsersCounts, pageSize, currentPage, onPageChanged, portionSize = 15}) => {

    let pagesCount = Math.ceil(totalUsersCounts / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
        <div className={a.currentsPageList}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber-1)}}>back</button> }
            {pages
                .filter (p => p >=leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span
                    className={currentPage === p ? a.selectedPage : a.currentsPage}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}>{p}
                    </span>
            })}
            {portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber+1)}}>Next</button>}
        </div>
    </div>
}
export default Paginator;