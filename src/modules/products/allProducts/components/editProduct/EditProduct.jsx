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
            title: "Laboratory Test",
            icon: <LaboratoryIcon />,
            content: <LabTest product_id={id} />
        },
        {
            title: "Design",
            icon: <LaboratoryIcon />,
            content: <Design product_id={id} />
        },
        {
            title: "Submission",
            icon: <LaboratoryIcon />,
            content: <Submission product_id={id} />
        },
        {
            title: "Mandatory Declarations",
            icon: <LaboratoryIcon />,
            content: <Mandatory product_id={id} />
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
