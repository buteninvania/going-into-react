import a from "./paginator.module.css";
import React from "react";

const Paginator = ({totalUsersCounts, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCounts / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div><div className={a.currentsPageList}>
        {pages.map(p => {
            return <span
                        className={currentPage === p ? a.selectedPage : a.currentsPage}
                        onClick={(e) =>
                            {onPageChanged(p)}}>{p}
                    </span>
        })}
    </div></div>
}
export default Paginator;