// const { data } = require("jquery");
new Vue({
  // 一定要綁定
  el: '#app',
  data: {
    products: [{
      id: 1586934917210,
      unit: '台',
      category: '掌上主機',
      title: 'Switch',
      origin_price: 20000,
      price: 9980,
      // star:5,
      // star 的前台顯示
      description: '想玩就玩',
      content: '動森太好玩惹',
      is_enabled: 1,
      imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      selected: '1',
      selectStar:['1','2','3','4','5']
    }],
    // 暫存區
    tempProduct: {},
  },
  methods: {
    // 新增、修改、刪除 都是需要modal 打開 隱藏的
    // 新增，按鈕，click後開modal 塞資料進去 ≈ 編輯，打開modal 現有資料做編輯
    // 刪除，按鈕click後開modal 刪完資料要自己關閉
    // object assign 淺層拷貝！編輯、刪除會用到
    // 打開modal要做的動作，再寫update OR delete
    openModal(isNew, item) {
      switch (isNew) {
        case 'newProduct':
          this.tempProduct = {}
          $('#productModal').modal('show');
          break;
        case 'editProduct':
          // 先複製一份出來
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delProduct':
          // 先複製一份出來
          this.tempProduct = Object.assign({}, item);
          $('#delProductModal').modal('show');
          break;
      }
    },
    updateProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, key) => {
          if (item.id === id) {
            this.products[key] = this.tempProduct;
          }
        })
      } else {
        const upId = new Date().getTime();
        this.tempProduct.id = upId;
        // 這邊要有星星 
        this.products.push(this.tempProduct);
      }
      this.tempProduct = {}
      $('#productModal').modal('hide');
    },
    delProduct() {
      const id = this.tempProduct.id;
      if (id) {
        this.products.forEach((item, key) => {
          if (item.id === id) {
            this.products.splice(key, 1);
            // 刪除完就要馬上清空
            this.tempProduct = {};
          }
        })
        $('#delProductModal').modal('hide');
      }
    },




  },
});