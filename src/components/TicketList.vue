<template>
  <v-card>
    <v-card-title >
      Hello 12404958086.<br>
      Your recent transactions
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Detail</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">X</v-btn>
            </v-card-title>
            <hr>
            <v-card-text>
              <v-container>
                <iframe style="width: 100%"  v-bind:src="src()"></iframe>
                <p>Transaction Date: 06-27-2019</p>
                <p>Amount: $20</p>
                <p>Amount in Bitcoin: 0.00129543 BTC</p>

                <p style="text-align: center;">Additional Details</p>
                <p>Address: 12Hy.......................</p>
                <p>Transaction Type: BUY</p>
                <p>Transaction Crypto: BTC</p>
                <p>Crypto Transaction id: 9a7c7e.................</p>
                <p>ATM Transaction ID: 4be06...........</p>
                <p>ATM Status: COMPLETE</p>
                <p>Blockchain Status: COMPLETED</p>
              </v-container>
            </v-card-text>
          </div>
        </v-dialog>
      </v-row>
    </v-card-title>
    <v-card-title>
      <v-btn color="blue darken-1" dark v-on="on"   style="margin-right: 5px;">Copy</v-btn>
      <v-btn color="blue darken-1" dark v-on="on" style="margin-right: 5px;">PDF</v-btn>
      <v-btn color="blue darken-1" dark v-on="on" style="margin-right: 5px;">Print</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :search="search"
    >
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
/* eslint-disable */
import transactionCreate from '@/components/TransactionCreate.vue'
import transactionDetail from '@/components/TransactionDetail.vue'
import * as ticketAPI from '@/api/tickets'

export default {
  data () {
    return {
      dialog:false,
      origin:'dubai',
      destination:'ajman',
      modalData:{},
      url:"https://www.google.com/maps/embed/v1/directions?key=AIzaSyBIzTdBk82FwXWdetAl1PxbpFxyTiHZWLU",
      selected:[],
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'new_transaction_date'
        },
        { text: 'Update Report', value: '' },
        { text: 'Transaction Amount', value: 'amount_crypto' },
        { text: 'Bitcoin Wallet', value: 'address' },
        { text: 'Date Submitted', value: 'new_created_at' },
        { text: 'Updates', value: 'updates' },
        { text: 'Status', value: 'status' }
      ],
      items: []
    }
  },
  components: {
    transactionCreate,
    transactionDetail
  },
  mounted () {
    this.loadTransactions()
  },
  methods: {
    src: function(){
      return this.url + "&origin=" + this.origin + "&destination=" + this.destination;
    },
    async loadTransactions () {
      try {
        const resp = await ticketAPI.list({
          pageSize: 15
        })
        console.log(resp.data)
        if (resp.data) {
          this.items = resp.data.data
          this.items.forEach(element => {

            var date_str1 = (element.transaction_date).split('T');
            var date_arr1 = date_str1[0].split('-');
            var day = date_arr1[2];
            var month = date_arr1[1];
            var year = date_arr1[0];
            element.new_transaction_date = month + '-' + day + '-' +year;

            var date_str2 = (element.transaction_date).split('T');
            var date_arr2 = date_str2[0].split('-');
            var day = date_arr2[2];
            var month = date_arr2[1];
            var year = date_arr2[0];
            element.new_created_at = month + '-' + day + '-' +year;

            var date_str3 = (element.zendesk_ticket.updated_at).split('T');
            var date_arr3 = date_str3[0].split('-');
            var day = date_arr3[2];
            var month = date_arr3[1];
            var year = date_arr3[0];
            element.updates = month + '-' + day + '-' +year;
            
            element.status = 'closed';
          });
        }
      } catch (err) {
        this.handleError(err)
      }
    },
    viewTransaction (transaction) {
      console.log('viewing transaction', transaction.id)
      this.$router.push({
        name: ROUTE_NAME_TRANSACTION_DETAIL,
        params: {
          id: transaction.id
        }
      })
    },
    handleClick(value){
      this.dialog = true;
      this.modalData = value;
    }
  }
}
</script>

<style scoped>
.v-data-table__wrapper{
  border: 1px gray solid;
}
.v-card__actions{
    padding: 20px;
    padding-top: 0px;
}
.v-card__actions>.v-btn{
    width: 100%;
}
.v-card {
  margin: 30px 0px;
}
.v-data-table{
  padding: 16px;
}
</style>