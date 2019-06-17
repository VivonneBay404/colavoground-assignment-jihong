import React, { Component } from "react";
import classes from "./Cart.module.css";
import Button from "../../UI/Button/Button";
import axios from "axios";
import Modal from "../../UI/Modal/Modal";
import Items from "../Items/Items";
import CartItem from "../../components/CartItem/CartItem";
import CartDiscount from "../../components/CartDiscount/CartDiscount";
import SmallModal from "../../UI/Modal/SmallModal/SmallModal";
import ItemCounter from "../../components/ItemCounter/ItemCounter";
import DiscountedItemSelector from "../../components/DiscountedItemSelector/DiscountedItemSelector";

interface CartState {
  data: { items: {}; discounts: {} };
  selectedItems: any[];
  selectedDiscounts: any[];
  showModal: boolean;
  whichModal: string;
  totalPrice: number;
  showSmallModal: boolean;
  clickedCartItemId: string;
  smallModalContent: string;
}

class Cart extends Component<{}, CartState> {
  state = {
    data: { items: {}, discounts: {} },
    showModal: false,
    whichModal: "",
    selectedItems: [] as {
      id: string;
      name: string;
      price: number;
      count: number;
    }[],
    selectedDiscounts: [] as {
      id: string;
      name: string;
      rate: number;
      discountedItems: {
        id: string;
        name: string;
        count: number;
        price: number;
      }[];
      discountedPrice: number;
    }[],
    totalPrice: 0,
    showSmallModal: false,
    clickedCartItemId: "",
    smallModalContent: ""
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
  smallModalCancelHandler = () => {
    this.setState({ showSmallModal: false });
  };

  //아이템을 선택해서 selectedItems에 넣어주는 func
  selectItemHandler = (itemId: string) => {
    const oldSelectedItems = [...this.state.selectedItems];
    const oldSelectedDiscounts = [...this.state.selectedDiscounts];
    const itemData: any = { ...this.state.data.items };
    const discountData: any = { ...this.state.data.discounts };

    for (const item in itemData) {
      if (item === itemId) {
        //oldSelectedItems에 선택한 아이템을 넣고 id property도 추가
        oldSelectedItems.push({ ...itemData[item], id: itemId });
      }
    }
    for (const discount in discountData) {
      if (discount === itemId) {
        //oldSelectedDiscount에 선택한 아이템을 넣고 id property도 추가
        oldSelectedDiscounts.push({
          ...discountData[discount],
          id: itemId,
          discountedItems: oldSelectedItems
        });
      }
    }
    //가격 계산 로직
    let totalPrice = 0;
    oldSelectedItems.map(e => {
      return (totalPrice += e.price * e.count);
    });

    this.setState({
      selectedItems: oldSelectedItems,
      selectedDiscounts: oldSelectedDiscounts,
      totalPrice: totalPrice
    });
  };

  cartItemCountHandler = (id: string) => {
    console.log(id);
    this.setState({
      showSmallModal: true,
      clickedCartItemId: id,
      smallModalContent: "item"
    });
  };
  //cartItems의 count를 바꿔줌
  cartItemCountChangeHandler = (value: number) => {
    const oldSelectedItems = [...this.state.selectedItems];
    const clickedCartItemId = this.state.clickedCartItemId;
    let willChangeItem: any = oldSelectedItems.find(
      e => e.id === clickedCartItemId
    );
    const count = "count";
    willChangeItem[count] = value;
    const index = oldSelectedItems.findIndex(e => e.id === clickedCartItemId);
    oldSelectedItems.splice(index, 1, willChangeItem);

    //가격 계산 로직
    let totalPrice = 0;
    oldSelectedItems.map(e => {
      return (totalPrice += e.price * e.count);
    });

    this.setState({ selectedItems: oldSelectedItems, totalPrice: totalPrice });
  };
  //선택된 카트아이템을 삭제함 & cartDiscount에서 삭제된 아이템 삭제함
  cartItemDeleteHandler = () => {
    const oldSelectedItems = [...this.state.selectedItems];
    const oldSelectedDiscounts = [...this.state.selectedDiscounts];
    //selectedIdscounts에 있는 selectedItems를 mapping
    const selectedItemsOfDiscounts = oldSelectedDiscounts.map(e => {
      return e.discountedItems;
    });
    console.log(selectedItemsOfDiscounts);
    const clickedCartItemId = this.state.clickedCartItemId;
    console.log(clickedCartItemId);

    //선택한 cartItem을 삭제
    const index = oldSelectedItems.findIndex(e => e.id === clickedCartItemId);
    oldSelectedItems.splice(index, 1);

    //삭제된 cartItem을 cartDiscount의 selectedItems에서도 삭제함
    selectedItemsOfDiscounts.forEach(e => {
      const discountIndex = e.findIndex(e => e.id === clickedCartItemId);
      console.log(discountIndex);
      console.log(e);
      e.splice(discountIndex, 1);
      console.log(e);
    });

    console.log(selectedItemsOfDiscounts);

    //가격 계산 로직
    let totalPrice = 0;
    oldSelectedItems.map(e => {
      return (totalPrice += e.price * e.count);
    });

    // const updatedSelectedDiscounts = oldSelectedDiscounts.map(e => e.discountedItems = selectedItemsOfDiscounts.forEach()

    this.setState({
      selectedItems: oldSelectedItems,
      totalPrice: totalPrice
      // selectedDiscounts: updatedSelectedDiscounts
    });
  };

  cartDiscountHandler = (id: string) => {
    console.log(id);
    this.setState({
      showSmallModal: true,
      clickedCartItemId: id,
      smallModalContent: "discount"
    });
  };

  discountedItemsChangeHandler = (id: string, clickedId: string) => {
    console.log(id);
    const selectedDiscounts = [...this.state.selectedDiscounts];
    console.log(selectedDiscounts);
    const clickedSelectedDiscount = selectedDiscounts.find(
      e => e.id === clickedId
    );
    console.log(clickedSelectedDiscount);
    if (clickedSelectedDiscount!.discountedItems.find(e => e.id === id)) {
      const discountedItemsIndex = clickedSelectedDiscount!.discountedItems.findIndex(
        e => e.id === id
      );
      clickedSelectedDiscount!.discountedItems.splice(discountedItemsIndex, 1);
    }
    console.log(clickedSelectedDiscount);
    // 바꿀 selectedDiscount 인덱스 찾기
    const changedSelectedDiscountIndex = selectedDiscounts.findIndex(
      e => e.id === id
    );
    //바꾼 selectedDiscount로 바꿔넣기
    selectedDiscounts.splice(
      changedSelectedDiscountIndex,
      1,
      clickedSelectedDiscount!
    );

    this.setState({ selectedDiscounts: selectedDiscounts });
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
          clicked={() => this.cartItemCountHandler(e.id)}
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
          rate={e.rate}
          discountedItems={e.discountedItems}
          clicked={() => this.cartDiscountHandler(e.id)}
        />
      );
    });

    // 클릭한 카트아이템 찾기 <ItemCounter/>에 사용
    const clickedItem: any = selectedItems.find(
      e => e.id === this.state.clickedCartItemId
    );

    //클릭한 cartDiscount 찾기
    const clickedDiscount: any = selectedDiscounts.find(
      e => e.id === this.state.clickedCartItemId
    );

    // this.state.smallModalContent 가 discount면 discouuntedItemSelector 보여줌
    let smallModalContent = null;
    if (this.state.smallModalContent === "discount") {
      smallModalContent = (
        <DiscountedItemSelector
          canceled={this.smallModalCancelHandler}
          selectedItems={this.state.selectedItems}
          clickedDiscount={
            clickedDiscount || { name: "default", rate: 1, id: "default" }
          }
          selectedDiscounts={selectedDiscounts}
          changed={this.discountedItemsChangeHandler}
        />
      );
    } else {
      smallModalContent = (
        <ItemCounter
          canceled={this.smallModalCancelHandler}
          countChangeHandler={value => this.cartItemCountChangeHandler(value)}
          itemDeleteHandler={this.cartItemDeleteHandler}
          clickedItem={
            //처음에 undefined라 default value 넣음
            clickedItem || { name: "defalut", count: 1, id: "default" }
          }
        />
      );
    }

    return (
      <>
        <Modal show={this.state.showModal} canceled={this.modalCancelHandler}>
          {modalContent}
        </Modal>
        <SmallModal
          show={this.state.showSmallModal}
          canceled={this.smallModalCancelHandler}
        >
          {smallModalContent}
        </SmallModal>
        <div className={classes.Cart}>
          <div>박지홍</div>
          <Button clicked={this.itemsButtonHandler}>시술</Button>
          <Button clicked={this.discountsButtonHandler}>할인</Button>
          <div className={classes.CartItems}>
            {cartItems}
            {cartDiscounts}
          </div>
        </div>

        <div className={classes.Footer}>
          <div className={classes.TotalPriceWrapper}>
            <div>합계</div>
            <div className={classes.Price}>{this.state.totalPrice}</div>
          </div>
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
