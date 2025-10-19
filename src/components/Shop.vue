<script>
export default {
  data() {
    return {
      //Dummy list of lessons
      lessons: [
        { Subject: 'German', Location: 'NW0 0ZZ', Price: 40, Spaces: 0, Icon: 'fa-solid fa-language' },
        { Subject: 'French', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-language' },
        { Subject: 'Spanish', Location: 'NW0 0ZZ', Price: 60, Spaces: 5000, Icon: 'fa-solid fa-language' },
        { Subject: 'Geography', Location: 'NW0 0ZZ', Price: 80, Spaces: 5000, Icon: 'fa-solid fa-earth-europe' },
        { Subject: 'Math', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-calculator' },
        { Subject: 'Design Technologies', Location: 'NW0 0ZZ', Price: 80, Spaces: 5000, Icon: 'fa-solid fa-ruler' },
        { Subject: 'Textiles', Location: 'NW0 0ZZ', Price: '0', Spaces: 5000, Icon: 'fa-solid fa-ruler' },
        { Subject: 'Sports', Location: 'NW0 0ZZ', Price: '0', Spaces: 5000, Icon: 'fa-solid fa-rug' },
        { Subject: 'History', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-book' },
        { Subject: 'Environmental Science', Location: 'NW0 0ZZ', Price: 60, Spaces: 0, Icon: 'fa-solid fa-seedling' },
      ],
      //Dummy Copy
      lessons_Copy: [
        { Subject: 'German', Location: 'NW0 0ZZ', Price: 40, Spaces: 0, Icon: 'fa-solid fa-language' },
        { Subject: 'French', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-language' },
        { Subject: 'Spanish', Location: 'NW0 0ZZ', Price: 60, Spaces: 5000, Icon: 'fa-solid fa-language' },
        { Subject: 'Geography', Location: 'NW0 0ZZ', Price: 80, Spaces: 5000, Icon: 'fa-solid fa-earth-europe' },
        { Subject: 'Math', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-calculator' },
        { Subject: 'Design Technologies', Location: 'NW0 0ZZ', Price: 80, Spaces: 5000, Icon: 'fa-solid fa-ruler' },
        { Subject: 'Textiles', Location: 'NW0 0ZZ', Price: '0', Spaces: 5000, Icon: 'fa-solid fa-ruler' },
        { Subject: 'Sports', Location: 'NW0 0ZZ', Price: '0', Spaces: 5000, Icon: 'fa-solid fa-rug' },
        { Subject: 'History', Location: 'NW0 0ZZ', Price: 40, Spaces: 5000, Icon: 'fa-solid fa-book' },
        { Subject: 'Environmental Science', Location: 'NW0 0ZZ', Price: 60, Spaces: 0, Icon: 'fa-solid fa-seedling' },

      ],
      //Basket 
      basket: [],
      ascending_Descending_Button: "Ascending",
      sorting: ["", false, ""],

    };
  },
  methods: {
    //Removes lessons from lesson list
    out_Of_Spaces_Remove(lessons) {
      lessons.forEach((element, index) => {
        if (element.Spaces === 0) {
          this.lessons.splice(index, 1);
          console.log(element.Subject, 1);
        }
        console.log(lessons.length);
      });
    },
    //Given a list and subject type it'll go through the list removing any subjects that aren't the given type
    filter_By_Subject(lessons, subject_Choice) {
      if (subject_Choice != "Any Subject") {
        for (let index = lessons.length - 1; index >= 0; index--) {
          console.log(index);
          console.log(subject_Choice, index)
          if (lessons[index].Subject != subject_Choice) {
            this.lessons.splice(index, 1);
            console.log(subject_Choice, " removed")
          } else {
          }
        }
      }
    },
    price_Sort(price_Choice) {
      //lessons=lessons.sort((a, b) => {return a.Price - b.Price})
      if (price_Choice == "priceHigh") {
        this.lessons = this.lessons.sort((a, b) => { return b.Price - a.Price })
      } else if (price_Choice == "priceLow") {
        this.lessons = this.lessons.sort((a, b) => { return a.Price - b.Price })
      }

    },
    //Adds a lesson to the basket list
    add_To_Basket(lesson) {
      if (!this.basket.includes(lesson)) {
        Object.defineProperty(lesson, "Quantity", { configurable: true, value: 1 });
        this.basket.push(lesson);
      } else {
        const index = this.basket.findIndex((element) => element.Subject == lesson.Subject);
        let Basket_Item = this.basket[index];
        Object.defineProperty(Basket_Item, "Quantity", { value: this.basket[index].Quantity + 1 });
        this.basket.splice(index, 1);
        this.basket.push(Basket_Item);
      }
    },
    //Removes a lesson from the basket list
    remove_From_Basket(lesson_Id) {
      if (this.basket[lesson_Id].Quantity === 1) {
        this.basket.splice(lesson_Id, 1);
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
    //function that converts degrees to radians
    convert_To_Radians(degree){
      return degree*Math.PI/180;
    },
    haversine_Formula(lat_1, long_1, lat_2, long_2){
      radius_Of_Earth=6,371;
      //difference between 2 lattitude values given
      Δ_lat=Math.abs(lat_1-lat_2);
      Δ_lat=this.convert_To_Radians(Δ_lat);
      //difference between 2 longitude degrees given
      Δ_long=Math.abs(long_1-long_2);
      Δ_long=this.convert_To_Radians(Δ_long);
      
      formulae=Math.pow(Math.sin(Δ_lat/2), 2)+Math.pow(Math.sin(Δ_long/2), 2)*Math.cos(lat_1)*Math.cos(lat_2);

    }
  }
}
</script>

<template>
    <div class="container">
    <div class="row">
      <!-- Offcanvas Sidebar -->
      <div class="offcanvas offcanvas-end" id="basket-sidebar">
        <div class="offcanvas-header">
          <h1 class="offcanvas-title">Basket</h1>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <!--Basket display-->
        <div class="offcanvas-body" id="basket-sidebar">
          <div v-for="(lesson, index) in basket" class="card">
            <h3 class="card-title">{{ lesson.Subject }}</h3>
            <div class="card-body">
              <p class="card-text">Location: {{ lesson.Location }}</p>
              <p class="card-text">Price: £{{ lesson.Price }}</p>
              <p class="card-text">Available Spaces:{{ lesson.Spaces }}</p>
              <p class="card-text">Available Spaces:{{ lesson.Quantity }}</p>
              <button class="btn btn-danger" @click="remove_From_Basket(index)">Remove</button>
            </div>
          </div>
          <button class="btn btn-secondary" type="button">A Button</button>
        </div>
      </div>
      <div class="column-sm-12">
        <input type="text float-start" placeholder="Search...">
        <!-- Button to open the basket sidebar -->
        <button v-if="basket.length > 0" class="btn btn-primary float-end" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#basket-sidebar"><i class="fa-solid fa-basket-shopping"></i><i
            class="fa-solid fa-user"></i></button>
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
                        value="Any Subject" v-model="sorting[2]">
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
          <input type="text float-start" class="form-control" placeholder="Search...">
        </div>
        <!--Render lessons for user-->
        <div class="row row-cols-2">
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