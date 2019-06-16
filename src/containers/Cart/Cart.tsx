import React, { Component } from "react";
import classes from "./Cart.module.css";
import Button from "../../UI/Button/Button";
import axios from "axios";
import Modal from "../../UI/Modal/Modal";
import Items from "../Items/Items";
import CartItem from "../../components/CartItem/CartItem";
import CartDiscount from "../../components/CartDiscount/CartDiscount";

interface CartState {
  data: { items: {}; discounts: {} };
  selectedItems: any[];
  selectedDiscounts: any[];
  showModal: boolean;
  whichModal: string;
  totalPrice: number;
}

class Cart extends Component<{}, CartState> {
  state = {
    data: { items: {}, discounts: {} },
    showModal: false,
    whichModal: "",
    selectedItems: [] as {
      // key: string;
      id: string;
      name: string;
      price: number;
      // rate: number;
      count: number;
    }[],
    selectedDiscounts: [] as {
      id: string;
      name: string;
      // price: number;
      rate: number;
      // count: number;
    }[],
    totalPrice: 0
  };

  itemsButtonHandler = () => {
    this.setState({ showModal: true, whichModal: "items" });
    console.log("whichmodal:" + this.state.whichModal);
  };
  discountsButtonHandler = () => {
    this.setState({ showModal: true, whichModal: "discounts" });
    console.log("whichmodal:" + this.state.whichModal);
  };
  modalCancelHandler = () => {
    this.setState({ showModal: false });
  };

  //아이템을 선택해서 selectedItems에 넣어주는 func
  selectItemHandler = (itemId: string) => {
    const oldSelectedItems = [...this.state.selectedItems];
    const oldSelectedDiscounts = [...this.state.selectedDiscounts];
    const itemData: any = { ...this.state.data.items };
    const discountData: any = { ...this.state.data.discounts };
    console.log(oldSelectedItems);
    console.log(itemData);
    console.log(itemId);

    for (const item in itemData) {
      if (item === itemId) {
        //oldSelectedItems에 선택한 아이템을 넣고 id property도 추가
        oldSelectedItems.push({ ...itemData[item], id: itemId });
        console.log(typeof oldSelectedItems);
        console.log(itemData[item]);
      }
    }
    for (const discount in discountData) {
      if (discount === itemId) {
        //oldSelectedDiscount에 선택한 아이템을 넣고 id property도 추가
        oldSelectedDiscounts.push({ ...discountData[discount], id: itemId });
        console.log(typeof oldSelectedDiscounts);
        console.log(discountData[discount]);
      }
    }
    //가격 계산 로직
    let totalPrice = 0;
    oldSelectedItems.map(e => {
      totalPrice += e.price;
    });

    this.setState({
      selectedItems: oldSelectedItems,
      selectedDiscounts: oldSelectedDiscounts,
      totalPrice: totalPrice
    });
  };

  render() {
    console.log(this.state.selectedItems);
    console.log(this.state.selectedDiscounts);
    const modalContent = (
      <Items
        clicked={this.modalCancelHandler}
        data={this.state.data}
        identifier={this.state.whichModal}
        itemClicked={this.selectItemHandler}
        selectedItems={this.state.selectedItems}
        selectedDiscounts={this.state.selectedDiscounts}
      />
    );
    const selectedItems = [...this.state.selectedItems];
    const cartItems = selectedItems.map(e => {
      return (
        <CartItem
          key={e.id}
          name={e.name}
          price={e.price}
          count={e.count}
          // rate={e.rate}
        />
      );
    });
    //선택된 discounts를 맵핑
    const selectedDiscounts = [...this.state.selectedDiscounts];
    const cartDiscounts = selectedDiscounts.map(e => {
      return (
        <CartDiscount
          key={e.id}
          name={e.name}
          // price={e.price}
          // count={e.count}
          rate={e.rate}
        />
      );
    });

    return (
      <>
        <Modal show={this.state.showModal} canceled={this.modalCancelHandler}>
          {modalContent}
        </Modal>
        <div className={classes.Cart}>
          <div>박지홍</div>
          <Button clicked={this.itemsButtonHandler}>시술</Button>
          <Button clicked={this.discountsButtonHandler}>할인</Button>
        </div>
        <div className={classes.CartItems}>
          {cartItems}
          {cartDiscounts}
        </div>
        <div className={classes.Footer}>
          <div className={classes.TotalPriceWrapper}>
            <div>합계</div>
            <div className={classes.Price}>{this.state.totalPrice}</div>
          </div>

          {/* <Button clicked={}>다음</Button> */}
        </div>
      </>
    );
  }
  componentDidMount() {
    axios
      .get(
        "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
      )
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Cart;
