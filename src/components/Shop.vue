<script>
export default {
  props: ["basket_Data"],
  data() {
    return {
      Auto_Complete: "",
      //Dummy list of lessons
      lessons: [],
      //Dummy Copy
      lessons_Copy: [],
      //Basket 
      basket: this.basket_Data,
      ascending_Descending_Button: "Ascending",
      sorting: ["", false, "Any Subject"],
      range: 1,
      query: "",
      sort: "Relevancy"

    };
  },
  computed: {
  },
  methods: {
    //Removes lessons from lesson list
    out_Of_Spaces_Remove(lessons) {
      lessons.forEach((element, index) => {
        if (element.Spaces === 0) {
          this.lessons.splice(index, 1);
        }
      });
    },
    //Given a list and subject type it'll go through the list removing any subjects that aren't the given type
    filter_By_Subject(lessons, subject_Choice) {
      if (subject_Choice != "Any Subject") {
        for (let index = lessons.length - 1; index >= 0; index--) {
          if (lessons[index].Subject != subject_Choice) {
            this.lessons.splice(index, 1);
          }
        }
      }
    },
    price_Sort(price_Choice) {
      if (price_Choice == "priceHigh") {
        this.lessons = this.lessons.sort((a, b) => { return b.Price - a.Price })
      } else if (price_Choice == "priceLow") {
        this.lessons = this.lessons.sort((a, b) => { return a.Price - b.Price })
      }

    },
    //Adds a lesson to the basket list
    add_To_Basket(lesson) {
      const lesson_Index = this.lessons.findIndex((element) => element === lesson);
      this.lessons[lesson_Index].Spaces = this.lessons[lesson_Index].Spaces - 1;
      if (!this.basket.some(item => item._id === lesson._id)) {
        this.basket.push(Object.assign({}, lesson));
        Object.defineProperty(this.basket[this.basket.length - 1], "Quantity", { configurable: true, value: 1 });
      } else {
        const index = this.basket.findIndex((element) => element._id == lesson._id);
        let Basket_Item = this.basket[index];
        Object.defineProperty(Basket_Item, "Quantity", { value: this.basket[index].Quantity + 1 });
        Object.defineProperty(Basket_Item, "Price", { value: this.basket[index].Quantity * this.basket[index].Price });
      }
      this.$forceUpdate();
    },
    subject_Sort_AZ(a, b) {
      const subjectA = a.Subject.toUpperCase();
      const subjectB = b.Subject.toUpperCase();
      if (subjectA < subjectB) {
        return -1;
      }
      if (subjectA > subjectB) {
        return 1;
      }
    },
    subject_Sort_ZA(a, b) {
      const subjectA = a.Subject.toUpperCase();
      const subjectB = b.Subject.toUpperCase();
      if (subjectB < subjectA) {
        return -1;
      }
      if (subjectB > subjectA) {
        return 1;
      }
    },
    location_Sort_AZ(a, b) {
      const locationA = a.Location.toUpperCase();
      const locationB = b.Location.toUpperCase();
      if (locationA < locationB) {
        return -1;
      }
      if (locationA > locationB) {
        return 1;
      }
    },
    location_Sort_ZA(a, b) {
      const locationA = a.Subject.toUpperCase();
      const locationB = b.Subject.toUpperCase();
      if (locationB < locationA) {
        return -1;
      }
      if (locationB > locationA) {
        return 1;
      }
    },
    //Calls sort functions based on v model variable sort
    sort_Apply(){
      switch(this.sort){
        case "Subject(a-z)":
          this.lessons.sort(this.subject_Sort_AZ);
          break;
        case "Subject(z-a)":
          this.lessons.sort(this.subject_Sort_ZA);
          break;
        case "Location(a-z)":
           this.lessons.sort(this.location_Sort_AZ);
           break;
        case "Location(z-a)":
          this.lessons.sort(this.location_Sort_ZA);
           break;
        default:
      }
    },
    reverse_Unreverse_Array(lessons) {
      lessons.reverse();
    },
    //Function to go through the sorting list and see which filters the user wants to add/want buttons or dropdown boxes have been activated
    apply_Filters(filters) {
      for (let i = 0; i < filters.length; i++) {
        if (i === 0) {
          this.price_Sort(filters[i]);
        }
        /*The second position is related to the check box to only show available lessons 
        if this checkbox is called the function to remove unavailable lessons is called*/
        else if (i === 1) {
          if (filters[i] === true) {
            this.out_Of_Spaces_Remove(this.lessons);
          }
        }
        /*The third position in the filters array relates to the value of the subject radio button group 
        and calls the associated function to sort the lessons by the chosen subject or any subject 
        which is the default value*/
        else if (i === 2) {
          this.filter_By_Subject(this.lessons, filters[i]);

        }
      }
    },
    send_To_Basket() {
      this.$emit("toggle-basket", this.basket);
      this.$router.push("/Basket");
    },
    //Sends search request to backend and updates lessons with response
    async search2(event) {
      const query = event.target.value;
      this.query = query;
      const res = await fetch('https://project-comp-express-middleware.onrender.com/search?' + new URLSearchParams({
        search: query
      }).toString()).then(response => response.json()).then(response => this.lessons = response);
    },
  },
  mounted() {
    try {
      fetch('https://project-comp-express-middleware.onrender.com/').then(response => response.json()).then(response => this.lessons = response).then(response => this.lessons_Copy = response);
    } catch (err) {
      console.log("oh no !" + err);
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="column-sm-12">
        <!-- Button to go to the basket -->
        <button v-if="basket.length > 0" class="btn btn-primary float-end" type="button" @click="send_To_Basket()"><i
            class="fa-solid fa-basket-shopping"></i><i class="fa-solid fa-user"></i></button>
        <button v-if="basket.length === 0" class="btn btn-primary float-end" type="button" disabled><i
            class="fa-solid fa-basket-shopping"></i><i class="fa-solid fa-user"></i></button>
      </div>
    </div>
    <div class="row">
      <!--Sort functionality-->
      <div class="col-sm-2">
        <h1>Filter</h1>
        <div class="row">
          <div class="accordion" id="accordionExample">
            <!--Filter by Price-->
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Price
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <select id="priceChoice" v-model="sorting[0]">
                    <option disabled selected value> -- select an option -- </option>
                    <option value="priceHigh">Price High-Low</option>
                    <option value="priceLow">Price Low-High</option>
                  </select>
                </div>
              </div>
            </div>
            <!--Filter by items with available space-->
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  Available
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="Available" v-model="sorting[1]">
                    <label class="form-check-label" for="Available">Available slots</label>
                  </div>
                </div>
              </div>
            </div>
            <!--Filter by subject-->
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                  Subject
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <form>
                    <div class="form-check" value="Any subject">
                      <input class="form-check-input" type="radio" name="subject-group" id="Any Subject"
                        value="Any Subject" v-model="sorting[2]" checked>
                      <label class="form-check-label" for="Any Subject">Any Subject</label>
                    </div>
                    <div class="form-check" v-for="lesson in lessons" value={{lesson.Subject}}>
                      <input class="form-check-input" type="radio" name="subject-group" :id="lesson.Subject"
                        :value="lesson.Subject" v-model="sorting[2]">
                      <label class="form-check-label" :for="lesson.Subject">{{ lesson.Subject }}</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                  Ascending/Descending
                </button>
              </h2>
              <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <button class="btn btn-secondary" type="button" @click="reverse_Unreverse_Array(lessons)">{{
                    ascending_Descending_Button }} <i class="fa-solid fa-arrows-up-down"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Apply filters-->
        <div class="row">
          <label>Apply filters:</label>
          <button @click="apply_Filters(sorting)" class="btn btn-primary">Apply filters</button>
          <!--Clear filters-->
          <label>Clear filters:</label>
          <button @click="lessons = lessons_Copy.slice()" class="btn btn-secondary">Clear filters</button>
        </div>
      </div>
      <!--Item page-->
      <div class="col-sm-10">
        <h1>Lessons</h1>
        <!--div class "input-group" for formatting and styling the search bar-->
        <div class="input-group">
          <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text float-start" class="form-control" placeholder="Search..." @keyup.enter="search2">
        </div>
        <select name="sorts" id="sort-select" @change="sort_Apply()" v-model="sort">
          <option value="Relevancy">Relevancy</option>
          <option value="Subject(a-z)">Subject(a-z)</option>
          <option value="Subject(z-a)">Subject(z-a)</option>
          <option value="Location(a-z)">Location(a-z)</option>
          <option value="Location(z-a)">Location(z-a)</option>
        </select>
        <!--Render lessons for user-->
        <div class="row row-cols-2">
          <div v-if="this.lessons.length === 0">no results for "{{ query }}"</div>
          <div v-for="lesson in lessons" class="col">
            <!--Lessons rendered as bootstrap cards with all relevant information from the array-->
            <div class="card">
              <h3 class="card-title"><i :class="lesson.Icon"></i>{{ lesson.Subject }}</h3>
              <div class="card-body">
                <p class="card-text">Location: {{ lesson.Location }}</p>
                <p class="card-text">Price: £{{ lesson.Price }}</p>
                <p class="card-text">Available Spaces:{{ lesson.Spaces }}</p>
              </div>
              <button v-if="lesson.Spaces > 0" class="btn btn-secondary" @click="add_To_Basket(lesson)">Add to
                basket</button>
              <button v-else class="btn btn-danger" disabled>Out of spaces</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>