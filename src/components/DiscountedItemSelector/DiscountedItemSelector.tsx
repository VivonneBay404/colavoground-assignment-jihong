import React from "react";
import classes from "./DiscountedItemSelector.module.css";
import Button from "../../UI/Button/Button";

type props = {
  canceled: () => void;
  selectedItems: { name: string; price: number; id: string }[];
  clickedDiscount: any;
  selectedDiscounts: {
    id: string;
    name: string;
    rate: number;
    discountedItems: {
      id: string;
      name: string;
      count: number;
      price: number;
    }[];
  }[];
  changed: (id: string, clickedDiscountId: string) => void;
};

const discountedItemSelector: React.FC<props> = props => {
  const selectedItems = props.selectedItems;
  const clickedDiscount = props.clickedDiscount;
  const selectedDiscounts = props.selectedDiscounts;
  console.log(selectedDiscounts);
  //clickedDiscount의 아이디와 selectedDiscounts의 아이디가 같은 discount 찾기
  const selectedDiscountMatch = selectedDiscounts.find(
    e => e.id === clickedDiscount.id
  );
  console.log(selectedDiscountMatch);
  const matchedDiscountedItems = selectedDiscountMatch!.discountedItems;
  console.log(matchedDiscountedItems);

  const selectedItemsList = selectedItems.map(e => {
    let check = <div />;
    //matchedDiscountedItems의 id 와 selectedItems의 id가 맞는게 있다면 v 표시
    if (matchedDiscountedItems.find(d => d.id === e.id)) check = <div>v</div>;

    return (
      <div
        className={classes.SelectedItemsWrapper}
        onClick={() => props.changed(e.id, clickedDiscount.id)}
      >
        <div className={classes.NamePriceWrapper}>
          <div>{e.name}</div>
          <div>{e.price}</div>
        </div>
        {check}
      </div>
    );
  });

  return (
    <div className={classes.DiscountedItemSelector}>
      <div>{clickedDiscount.name}</div>
      {selectedItemsList}
      <div>
        <Button clicked={props.canceled}>삭제</Button>
        <Button clicked={props.canceled}>확인</Button>
      </div>
    </div>
  );
};
export default discountedItemSelector;
