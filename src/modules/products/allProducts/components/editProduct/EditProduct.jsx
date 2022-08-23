import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import Details from './Details'
import { getProduct } from "../request";
import Recipe from "./recipe/Recipe";
import LabTest from "./labTest/LabTest";
import SummaryIcon from "../../../../../containers/components/menu/icons/SummaryIcon";
import LaboratoryIcon from "../../../../../containers/components/menu/icons/LaboratoryIcon";
import ProductIdentification from "../../../../../containers/components/menu/icons/ProductIdentification";
import Design from "./Design/Design";
import ProductDetails from "./product details/ProductDetails";
import Submission from "./submission/recipe/Submission";
import Mandatory from "./Mandatory/Mandatory";
import ProductBrands from "./Brands/ProductBrands";

const pageConfig = {
    headers: {
        title: "Edit Product",
        breadcrumb: [
            {
                name: "Product",
                path: "/products/all_products"
            },
            {
                name: "Edit",
            }
        ]
    }

}

const EditProduct = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(true);

    const [data, setData] = useState({
        
        object: null,
        dependencies: []
    });




    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = () => {
        makeRequest(setLoader, getProduct, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Product Identification",
            icon: <ProductIdentification />,

            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Product Details",
            icon: <ProductIdentification />,

            content: <ProductDetails data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Recipe",
            icon: <SummaryIcon />,
            content: <Recipe product_id={id} />
        },
        {
            title: "Brands",
            icon:
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17 19C18.6569 19 20 17.6569 20 16C20 14.3431 18.6569 13 17 13C15.3431 13 14 14.3431 14 16C14 17.6569 15.3431 19 17 19Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 19C8.65685 19 10 17.6569 10 16C10 14.3431 8.65685 13 7 13C5.34315 13 4 14.3431 4 16C4 17.6569 5.34315 19 7 19Z" stroke="#0093CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>,
            content: <ProductBrands product_id={id} />
        },
        {
            title: "Laboratory Test",
            icon: <LaboratoryIcon />,
            content: <LabTest product_id={id} />
        },
        {
            title: "Design",
            icon: <LaboratoryIcon />,
            content: <Design data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Mandatory Declarations",
            icon: <LaboratoryIcon  />,
            content: <Mandatory data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Submission",
            icon: <LaboratoryIcon />,
            content: <Submission product_id={id} />
        },
        


    ]

    const onError = (error, msg) => {
        notify(msg.message);
      };
    

    if (data.length === 0) {
        return "";
    }
    return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;

}

export default EditProduct;
