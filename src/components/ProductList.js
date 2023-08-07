import React from "react";
import { Row, Pagination } from "react-bootstrap";
import ProductItem from "./ProductItem.js";
import { useContext } from "react";
import { AppContext } from "./AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductList = observer(() => {
    const { catalog } = useContext(AppContext);
    const navigate = useNavigate();

    const handleFirstPage = () => {
        handleClick(1);
    };

    const handleLastPage = () => {
        handleClick(catalog.pages);
    };

    const handleNextPage = () => {
        if (catalog.page < catalog.pages) {
            handleClick(catalog.page + 1);
        }
    };

    const handlePrevPage = () => {
        if (catalog.page > 1) {
            handleClick(catalog.page - 1);
        }
    };

    const handleClick = (page) => {
        catalog.page = page;
        const params = {
            category: catalog.category,
            brand: catalog.brand,
            mehanizm: catalog.mehanizm,
            gender: catalog.gender,
            shape: catalog.shape,
            material: catalog.material,
            glass: catalog.glass,
            strap: catalog.strap,
            power: catalog.power,
            water: catalog.water,
            page: catalog.page,
        };
        navigate({
            pathname: "/shop",
            search: "?" + createSearchParams(params),
        });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 10; // Максимальное количество кнопок
        const halfMaxButtons = Math.floor(maxPageButtons / 2);
        const totalPages = catalog.pages;

        let startPage = Math.max(1, catalog.page - halfMaxButtons);
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        // Add ellipsis if necessary
        if (startPage > 1) {
            pageNumbers.push(
                <Pagination.Ellipsis key="ellipsis-start" onClick={() => handleClick(startPage - 1)} />
            );
        }

        // Logic to display page numbers
        for (let page = startPage; page <= endPage; page++) {
            pageNumbers.push(
                <Pagination.Item
                    key={page}
                    active={page === catalog.page}
                    onClick={() => handleClick(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <Pagination.Ellipsis key="ellipsis-end" onClick={() => handleClick(endPage + 1)} />
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <Helmet>
                {/* Мета-теги */}
            </Helmet>
            <Row className="mb-3">
                {/* Отображение продуктов */}
            </Row>
            {catalog.pages > 1 && (
                <Pagination>
                    <Pagination.First onClick={handleFirstPage} />
                    <Pagination.Prev onClick={handlePrevPage} />
                    {renderPageNumbers()}
                    <Pagination.Next onClick={handleNextPage} />
                    <Pagination.Last onClick={handleLastPage} />
                </Pagination>
            )}
        </>
    );
});

export default ProductList;
