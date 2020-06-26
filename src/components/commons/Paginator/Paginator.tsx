import React, {useState} from "react"
import a from "./paginator.module.css"

const Paginator: React.FC<PropsType> = ({totalUsersCounts, pageSize, currentPage, onPageChanged, portionSize = 15}) => {

    const pagesCount = Math.ceil(totalUsersCounts / pageSize)
    const pages: Array<number> = []
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={a.currentsPageList}>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>back</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span
                            className={currentPage === p ? a.selectedPage : a.currentsPage}
                            onClick={(e) => {
                                onPageChanged(p)
                            }}>{p}
                    </span>
                    })}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>}
            </div>
        </div>
    )
}

export default Paginator

type PropsType = {
    totalUsersCounts: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}