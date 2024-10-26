 <script>
import { supabase } from "../clients/supabase";
import { animate, stagger } from "motion";
export default {
  data() {
    return {
      Todo: [],
      userID: "",
      NewTodo: "",
      showTextTodoFielt: false,
    };
  },
  created() {
    this.fetchTasks();
    localStorage.setItem('AoutoLogin', 'yes')
  },
  methods: {
    startAnimation() {
      animate(
        ".trTodo",
        { x: 200 },
        {
          delay: stagger(0.1),
          duration: 0.5,
          easing: [0.22, 0.03, 0.26, 1],
        }
      );
    },
    async fetchTasks() {
      this.userID = localStorage.getItem("userID");
      try {
        console.log("Rufe Aufgaben ab für Benutzer-ID:", this.userID);

        const { data: Todos, error } = await supabase
          .from("Todos")
          .select("*")
          .eq("user_id", this.userID);

        if (error) throw error;

        if (!Todos || Todos.length === 0) {
          console.log("Keine Aufgaben gefunden.");
          return;
        }

        // Aufgaben im Array speichern
        this.Todo = Todos.map((todo) => ({ id: todo.id, task: todo.todo }));
        console.log("Erfolgreich abgerufene Aufgaben:", Todos);
        setTimeout(() => {
          this.startAnimation();
        }, 1000);
      } catch (error) {
        this.errorMessage =
          "Fehler beim Abrufen der Aufgaben: " + error.message;
        console.error("Fehler beim Abrufen der Aufgaben:", error);
      }
    },

    // Neue Aufgabe hinzufügen
    async add() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!this.NewTodo) {
          this.errorMessage = "Aufgabe darf nicht leer sein!";
          return;
        }

        console.log("Füge Aufgabe hinzu:", this.NewTodo);

        // Neue Aufgabe zur Datenbank hinzufügen
        const { data, error } = await supabase
          .from("Todos")
          .insert([{ user_id: user.id, todo: this.NewTodo }]);

        if (error) throw error;

        this.successMessage = "Aufgabe hinzugefügt!";
        this.NewTodo = ""; // Eingabefeld leeren
        this.fetchTasks(user.id); // Aufgabenliste nach dem Hinzufügen erneut abrufen
        this.changeViesibalFieldTask();
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Fehler beim Hinzufügen der Aufgabe:", error);
      }
    },

    // Aufgabe löschen
    async Delet(id) {
      try {
        console.log("Lösche Aufgabe mit ID:", id);

        // Aufgabe aus der Datenbank löschen
        const { error } = await supabase.from("Todos").delete().eq("id", id);

        if (error) throw error;

        // Aufgabe auch aus dem lokalen Array entfernen
        this.Todo = this.Todo.filter((todo) => todo.id !== id);
        console.log("Aufgabe gelöscht. Aktualisierte Aufgaben:", this.Todo);
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Fehler beim Löschen der Aufgabe:", error);
      }
    },
    /**
     *
     */
    changeViesibalFieldTask() {
      if (this.showTextTodoFielt === false) {
        animate(
          "#buttonAdd",
          { transform: "rotate(135deg)" },
          { duration: 0.5 }
        );
      }
      if (this.showTextTodoFielt === true) {
        animate(
          "#buttonAdd",
          { transform: "rotate(360deg)" },
          { duration: 0.5 }
        );
      }

      this.showTextTodoFielt = !this.showTextTodoFielt;
      console.log("check");
    },
  },
};
</script>

<template>
  <div class="w-full h-screen bg-slate-900">
    <div>
      <input
        id="todoInput"
        type="text"
        class="h-14 w-64 rounded-md absolute top-[20rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center placeholder:text-center transition-all"
        v-model="NewTodo"
        @keydown.enter="add"
        placeholder="Neue Aufgabe hinzufügen"
        v-if="showTextTodoFielt"
      />

      <div
        class="rounded-full absolute bottom-20 left-1/2 transform -translate-x-1/2 flex justif-center"
      >
        <button
          id="buttonAdd"
          @click="changeViesibalFieldTask"
          class="text-5xl mt-[-9px] text-white w-20 h-20 bg-cyan-500 rounded-3xl"
        >
          <div class="absolute left-1/2 transform -translate-x-1/2 bottom-5">
            +
          </div>
        </button>
      </div>

      <!-- 
      <button
        @click="changeViesibalFieldTask"
        v-if="showTextTodoFielt === false"
        class="bg-cyan-500 rounded-md w-60 h-12 text-white absolute bottom-10 transform -translate-x-1/2 left-1/2"
      >
        Aufgabe hinzufügen
      </button>
     
      <button
        @click="changeViesibalFieldTask"
        v-else
        class="bg-cyan-500 rounded-md w-60 h-12 text-white absolute bottom-10 transform -translate-x-1/2 left-1/2"
      >
        Abrechen
      </button>
       -->
    </div>
    <h3 class="text-white">Deine Aufgaben:</h3>
    <table id="tabel">
      <tr v-for="todo in Todo" :key="todo.id" class="trTodo">
        <td class="bg-slate-700 w-40 h-10">
          <label
            class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
            for="checkbox-2"
          >
            <input
              type="checkbox"
              id="checkbox-2"
              class="mdl-checkbox__input"
            />
            <span class="mdl-checkbox__label">Checkbox</span>
          </label>
          <input type="checkbox" @click="Delet(todo.id)" />
          <i>{{ todo.task }}</i>
        </td>
      </tr>
    </table>
  </div>
</template>



<style>
</style>