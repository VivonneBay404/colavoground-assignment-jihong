import React, { Component } from "react";
import classes from "./Items.module.css";
import Item from "./Item/Item";
import Button from "../../UI/Button/Button";
import { number, string } from "prop-types";

interface props {
  data: { items: {}; discounts: {} };
  clicked: () => void;
  identifier: string;
  itemClicked: (id: string) => void;
  selectedItems: { count: number; name: string; price: number; id: string }[];
  selectedDiscounts: {};
}

class Items extends Component<props> {
  state = {
    loading: false,
    items: {}
  };
  render() {
    console.log(this.props.data);
    //identifier 가 item 이면 item data를 가져옴 아니면 discounts 가져옴
    const items: any =
      this.props.identifier === "items"
        ? this.props.data.items
        : this.props.data.discounts;

    //items를 array로 바꿈
    let itemsArr = [];
    for (let item in items) {
      itemsArr.push({
        key: item,
        name: items[item].name,
        price: items[item].price,
        rate: items[item].rate,
        selected: false
      });
    }
    let selectedIds = [];
    const selectedItems = this.props.selectedItems;
    for (const item of selectedItems) {
      selectedIds.push(item.id);
    }

    console.log(selectedIds);
    //아이템 어레이와 셀렉티드아이템을 비교하여 key와 id가 같으면 selected:true 아니면 false
    let newItemsArr: {
      key: string;
      name: number;
      price: number;
      selected: boolean;
    }[] = [];

    for (let item of itemsArr) {
      for (let selectedItem of selectedItems) {
        if (item.key === selectedItem.id) {
          newItemsArr.push({ ...item, selected: true });
          break;
        }
      }
    }

    console.log(itemsArr);
    console.log(selectedItems);
    console.log(newItemsArr);

    const itemsList = itemsArr.map(e => {
      return (
        <Item
          key={e.key}
          name={e.name}
          price={e.price}
          rate={e.rate}
          //item을 클릭하면 key를 가져올수 있음
          clicked={() => this.props.itemClicked(e.key)}
        />
      );
    });

    return (
      <div className={classes.Items}>
        <div className={classes.Title}>
          {this.props.identifier === "items" ? "시술메뉴" : "할인메뉴"}
        </div>
        {itemsList}
        <div className={classes.Footer}>
          <Button clicked={this.props.clicked}>완료</Button>
        </div>
      </div>
    );
  }
}

export default Items;
