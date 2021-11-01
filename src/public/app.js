const DB = {
  data() {
    return {
      search: "",
      itemList: [{
          "code": "ACC1",
          "name": "Apple granny smith",
          "weight": 40,
          "scale": "LB",
          "quantity": 3128320,
          "category": "Fruits",
          "date": "2021-02-05 08:29:39"
        },
        {
          "code": "BDS1",
          "name": "Pineapple",
          "weight": 20,
          "scale": "LB",
          "quantity": 6530,
          "category": "Fruits",
          "date": "2021-05-05 22:14:39"
        },
        {
          "code": "BRA3",
          "name": "Potato",
          "weight": 82,
          "scale": "KG",
          "quantity": 9317,
          "category": "Yam",
          "date": "2021-10-31 14:38:39"
        },
        {
          "code": "USA123",
          "name": "Coffee",
          "weight": 33,
          "scale": "LB",
          "quantity": 1234,
          "category": "Beans",
          "date": "2021-08-01 12:00:00"
        },
        {
          "code": "BRA2",
          "name": "Orange",
          "weight": 36,
          "scale": "CT",
          "quantity": 65,
          "category": "Fruits",
          "date": "2021-03-01 05:50:00"
        }
      ],
      itemNames: [
        "Item Code",
        "Product",
        "Package",
        "Available Units",
        "Category",
        "Last Updated",
        "Edit Available Quantity"
      ]
    }
  },
  methods: {
    updateName(newName) {
      this.search = newName;
    },
    sortArray(sort) {
      if (sort.fieldName === "") return this.itemList;
      return this.itemList.sort((a, b) => {
        if (sort.asc) return a[sort.fieldName] < b[sort.fieldName] ? 1 : -1
        return a[sort.fieldName] > b[sort.fieldName] ? 1 : -1
      })
    }
  },
  computed: {
    filteredOption: function () {
      return this.itemList.filter((option) => {
        let codeName = option.code.toLowerCase();
        let productName = option.name.toLowerCase();
        let categoryName = option.category.toLowerCase();
        return codeName.match(this.search.toLowerCase()) ||
          productName.match(this.search.toLowerCase()) ||
          categoryName.match(this.search.toLowerCase());
      })
    }
  }
}

const app = Vue.createApp(DB)

app.component('single-item', {
  props: ['item'],
  methods: {
    formatNumber: function (value) {
      return value.toLocaleString();
    }
  },
  template: `
  <div class="item-code">
    <p class="code">{{item.code}}</p>
  </div>
  <div class="name-code">
    <p class="name">{{item.name}}</p>
  </div>
  <div class="package-weight">
    <p class="package">{{item.weight}} {{item.scale}}</p>
  </div>
  <div class="unity-code">
    <p class="unity">{{formatNumber(item.quantity)}}</p>
  </div>
  <div class="category-code">
    <p class="category">{{item.category}}</p>
  </div>
  <div class="updated-date">
    <p class="updated">{{item.date}}</p>
  </div>
  <div class="edit-qty">
    <p class="qty-label">Qty</p>
    <input type="number" v-model="item.quantity" />
  </div>
  `
})


app.component('search-bar', {
  props: ['name'],
  data() {
    return {
      search: ""
    }
  },
  emits: ['filteredName'],
  template: `
  <div>
    <input type="text" placeholder="Product Search"
    v-model="search"
    @input="$emit('filteredName', search)">
    <div class="fas fa-search icon"
    @click="$emit('filteredName', search)"></div>
  </div>
  `
})

app.component('header-names', {
  emits: ['sortingEvent'],
  data() {
    return {
      sortObject: {
        fieldName: '',
        asc: true
      }

    }
  },
  methods: {
    toggleSort(property) {
      if (property === this.sortObject.fieldName) {
        this.sortObject.asc = !this.sortObject.asc;
      } else {
        this.sortObject.fieldName = property;
        this.sortObject.asc = !this.sortObject.asc;
      }
      this.$emit('sortingEvent', this.sortObject);
    }
  },
  template: `
  <div class="item-code">
    <p class="code">Item Code</p>
  </div>
  <div class="name-code"
  @click="toggleSort('name')">
    <p class="name">Product</p>
    <div class="fas fa-sort icon-sort"
    ></div>
  </div>
  <div class="package-code"
  @click="toggleSort('weight')"
  >
    <p class="package">Package</p>
    <div class="fas fa-sort icon-sort"></div>
  </div>
  <div class="unity-code"
  @click="toggleSort('quantity')">
    <p class="unity">Available Units</p>
    <div class="fas fa-sort icon-sort"></div>
  </div>
  <div class="category-code">
    <p class="category">Category</p>
  </div>
  <div class="updated-date"
  @click="toggleSort('date')">
    <p class="date">Last Updated</p>
    <div class="fas fa-sort icon-sort">
    </div>
  </div>
  <div class="edit-qty">
    <p class="qty">Edit Avalable Quantity</p>
  </div>
  `
});

app.mount('#app');