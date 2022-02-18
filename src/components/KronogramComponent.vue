<template>
  <v-container v-if="order" fluid class="mb-10 px-3 border-ot">
    <div class="marca-agua">
      <img src="@/assets/logo.png" height="90px" />
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 20%" class="bb bt bl br">
        <img src="@/assets/logo.png" style="height: 60px; width: 100%" />
      </div>
      <div
        class="bb bt br"
        style="width: 60%; text-align: center; font-weight: 700"
      >
        <span style="font-size: 30px" v-if="order.type === 'lasazus'"
          >ORDEN DE TRABAJO</span
        >
        <div class="mt-3" style="font-size: 25px" v-else>
          CERTIFICADO DE SERVICIOS
        </div>
      </div>
      <div class="bb bt br pt-1" style="width: 20%">
        RESOLUCIÓN SANITARIA
        <BR />
        <span style="font-weight: 700; font-size: 18px">Nº 7776-10-2019</span>
        <BR />
        <span style="font-weight: 700; font-size: 18px">ISO 9001</span>
      </div>
    </div>
    <div
      class="d-flex block w-100 bb mb-2"
      style="border-bottom: 2px solid black"
    >
      <div style="width: 80%" class="text-left">
        <span style="font-size: 18px">
          REPRESENTANTE LEGAL: Luis Hernán Salazar Zuazo / RUT: 10.511.968-2
          <br />
          Calle Santa Lucia Nº 103 - Graneros
          <br />
          TELÉFONOS: 990156901 - 976179585
        </span>
      </div>
      <div style="width: 20%"></div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 32%" class="text-left">
        <span style="font-size: 17px"> FECHA: </span>
      </div>
      <div style="width: 36%" class="text-left">
        <span style="font-size: 17px"> HORA INICIO: </span>
      </div>
      <div style="width: 32%" class="text-left">
        <span style="font-size: 17px"> HORA TERMINO: </span>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 32%" class="text-left">
        <span style="font-size: 15px"> SERVICIOS PROGRAMADOS: </span>
      </div>
      <div style="width: 36%" class="text-left">
        <span style="font-size: 15px"> SERVICIOS EXTRAS: </span>
      </div>
      <div style="width: 32%" class="text-left">
        <span style="font-size: 15px"> OTROS: </span>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 68%" class="text-left d-flex">
        <div style="font-size: 15px; width: 100px">CLIENTE:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
      <div style="width: 32%" class="text-left d-flex">
        <div style="font-size: 15px; width: 100px">PLANTA:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 100%" class="text-left d-flex">
        <div style="font-size: 15px; width: 100px">Dirección:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 68%" class="text-left d-flex">
        <div style="font-size: 15px; width: 200px">Nombre solicitante:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
      <div style="width: 32%" class="text-left d-flex">
        <div style="font-size: 15px; width: 200px">RUT Solicitante:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 100%" class="text-left d-flex">
        <div style="font-size: 15px; width: 200px">Responsable planta:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
    </div>
    <div class="d-flex block w-100 mb-1">
      <div style="width: 100%" class="text-left d-flex">
        <div style="font-size: 15px; width: 200px">Responsable planta:</div>
        <div class="bb" style="width: 100%"></div>
      </div>
    </div>
  </v-container>

  <!-- PRODUCTS -->
</template>

<script>
// import { mapActions } from "vuex";
// import moment from "moment";
export default {
  data() {
    return {
      order: null,
      images: undefined,
    };
  },
  created() {
    // document.getElementById("viewport").setAttribute("content", "width=1400");
  },
  mounted() {
    // const { workOrder, documents } = await this.getWorkOrder({
    //   idLodging: this.$route.params.idLodging,
    //   indexWorkOrder: this.$route.params.index,
    // });
    // this.order = workOrder;
    // if (this.order.data[103])
    //   this.order.data[103] = this.order.data[103].split("\n");
    // if (this.order.reco2) this.order.reco2 = this.order.reco2.split("\n");
    // if (this.order.reco3) this.order.reco3 = this.order.reco3.split("\n");
    // this.images = documents.filter((document) => {
    //   const typeDocument = document.url.slice(-3);
    //   if (this.validateImage(typeDocument)) return true;
    //   return false;
    // });
  },
  methods: {
    getObservaciones(observationType) {
      // if (observationType) {
      //   if (this.order.data[21].customObservaciones.length)
      //     return this.order.data[21].customObservaciones;
      // }
    },
    getRecomendaciones(observationType) {
      // if (observationType) {
      //   if (this.order.data[21].customRecomendaciones.length)
      //     return this.order.data[21].customRecomendaciones;
      // }
    },
    isToday(orderDate, datePhoto) {
      // return moment(orderDate).isSame(datePhoto, "day");
    },
    createAt(id) {
      // if (id) return moment(this.dateFromObjectId(id)).format("lll");
      // else return "Sin fecha";
    },
    hasInfo(item) {
      // return item !== "Sin info";
    },
    dateFromObjectId(objectId) {
      // return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    },
    validateImage(typeDocument) {
      // typeDocument = typeDocument.toLowerCase();
      // if (
      //   typeDocument === "jpg" ||
      //   typeDocument === "png" ||
      //   typeDocument === "peg"
      // )
      //   return true;
      // return false;
    },
    formatWorkOrder(workOrder) {
      // return workOrder.map((item) => {
      //   if (item === null || item === false) return "No";
      //   if (item === true) return "Si";
      //   else return item;
      // });
    },
    // ...mapActions({
    //   getWorkOrder: "Lodging/getWorkOrder",
    //   getLodging: "Lodging/getLodging",
    // }),
  },
};
</script>

<style scoped>
input {
  height: 18px;
  border: 1px solid gray;
  background-color: #a2850721;
}
.nw {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.marca-agua {
  position: absolute;
  top: 40%;
  left: 30%;
  opacity: 0.1;
  z-index: 1;
}
* {
  color: black;
  -webkit-print-color-adjust: exact !important;
  color-adjust: exact !important;
  font-size: 12px;
}
/* Tamaño pagina 1056 1392 px  */
@media print {
  @page {
    size: A3 portrait;
    width: 100%;
    margin: auto;
  }
  .firmas {
    max-height: 90px !important;
    height: 90px !important;
  }
  .antecedentes-fotograficos {
    display: none;
  }
  .border-ot {
    display: table;
    margin: 0 auto;
    border: 0px !important;
  }
  .page-break {
    display: block;
    page-break-before: always;
  }
}
.border-a {
  border-bottom: 2px solid gray !important ;
  margin-bottom: 2px;
  width: 98%;
  max-width: 1050px;
  height: 1300px;
}
.bl {
  border-left: 1px solid black;
}
.br {
  border-right: 1px solid black;
}
.bt {
  border-top: 1px solid black;
}
.bb {
  border-bottom: 1px solid black;
}
.bg {
  background-color: #0056c7;
}
.bg-secondary {
  background-color: #80bd00;
}
.cc {
  width: 30px;
  height: 15px;
}
.border-ot {
  background-color: white;
  margin: 5px auto;
  width: 100%;
  max-width: 1050px;
}
.foto-antecedentes {
  border-radius: 15px;
  margin-bottom: 50px;
  height: 200px;
  width: 200px;
  border: 1px solid black;
}

.text--color {
  color: rgba(0, 0, 0, 0.74);
}
</style>
