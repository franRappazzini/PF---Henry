import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import PurchaseItem from "../PurchaseItem/PurchaseItem";
import React from "react";
import style from "./PurchasedItems.module.css";

function PurchaseItems({ products }) {
  return (
    <Accordion
      sx={{
        minHeight: "6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor:"#f6f7f9",
        width:"99%",
        marginLeft:"0.5vh",
        boxShadow: "3px 3px 20px 0px rgba(0,0,0,0.1)",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
       
      >
        <Box sx={{ display: "flex"  }}>
          {products?.length > 1 &&
            products.map((prod) => (
              <img
                src={prod.productData.image}
                alt={prod.productData.image}
                className={style.img_detail_items}
              />
            ))}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {products?.length > 1 && products.map((prod) => <PurchaseItem product={prod} />)}
      </AccordionDetails>
    </Accordion>
  );
}

export default PurchaseItems;
