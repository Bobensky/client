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
                <title>Интернет магазин наручных часов в Алматы - Aksessuary.KZ</title>
                <meta name="description" content="Онлайн магазин наручных часов"/>
                <meta name="keywords" content="магазин швейцарских часов, магазин наручных часов, купить швейцарские часы, купить наручные часы в Алматы, наручные часы в Алматы, 
                    часы в Алматы, купить наручные часы, наручные часы, часы, часы Anne Klein в Алматы, часы Calvin Klein в Алматы, часы Orinet в Алматы, 
                    часы Citizen в Алматы, часы Diesel в Алматы, часы Swatch в Алматы" />
            </Helmet>
            <Row className="mb-3">
                {catalog.products.length ? (
                    catalog.products.map((item) => (
                        <ProductItem key={`${item.id}_${catalog.page}`} data={item} />
                    ))
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )}
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
