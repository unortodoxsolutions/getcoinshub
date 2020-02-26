<template>
  <v-card>
    <v-card-title>
      Hello 12404958086.
      <br />Your recent transactions
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="700px">
          <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Detail</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="dialog = false">X</v-btn>
            </v-card-title>
            <hr />
            <v-card-text>
              <v-container>
                <iframe style="width: 100%; height:230px" v-bind:src="src()"></iframe>
                <p>Transaction Date: {{modalData.date}}</p>
                <p>Amount: {{modalData.amount_fiat}}</p>
                <p>Amount in Bitcoin: 0.00129543 BTC</p>

                <p style="text-align: center; font-size: 20px;">
                  <b>Additional Details</b>
                </p>
                <label>Address:</label>
                <label style="color:blue">{{modalData.address}}</label>
                <p v-if="modalData.type == 2">Transaction Type: BUY</p>
                <p v-else>Transaction Type: SELL</p>
                <p>Transaction Crypto: BTC</p>
                <label>Crypto Transaction id:</label>
                <label style="color:blue">{{modalData.txid}}</label>
                <p>ATM Transaction ID: {{modalData.shortcode}}</p>
                <p>ATM Status: COMPLETE</p>
                <p>Blockchain Status: COMPLETED</p>
                <p
                  style="text-align: center; font-size: 20px; font-color: blue"
                  @click="openReport()"
                >
                  <a>Additional Details</a>
                </p>
              </v-container>
            </v-card-text>
          </div>
        </v-dialog>
      </v-row>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="reportDialog" persistent max-width="600px">
          <div class="v-sheet theme--light">
            <v-card-title>
              <span class="headline">Transactions Create</span>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="reportDialog = false">X</v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field label="Transactions Date" required v-bind:value="modalData.date"></v-text-field>
                <v-text-field
                  label="Transactions Amount($)"
                  required
                  v-bind:value="modalData.amount_fiat"
                ></v-text-field>
                <v-text-field
                  label="Amount in Crypto"
                  required
                  v-bind:value="modalData.amount_crypto"
                ></v-text-field>
                <v-text-field label="Transaction Status" required value="COMPLETE"></v-text-field>
                <v-text-field
                  label="Crypto Wallet Address"
                  required
                  v-bind:value="modalData.address"
                ></v-text-field>
                <v-text-field label="Explain info about the Scam" required></v-text-field>
                <v-text-field label="Email Address" required></v-text-field>
                <v-text-field label="Phone Number" required></v-text-field>
                <p>Kindly upload your photo ID, police report, and any other releated info to the scam</p>
                <input type="file" id="file" name="file" />
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="reportDialog = false">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-dialog>
      </v-row>
    </v-card-title>
    <v-card-title>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">Copy</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">PDF</v-btn>
      <v-btn color="blue darken-1" dark style="margin-right: 5px;">Print</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <transaction-list :search="search" @click:row="viewTransaction" />
  </v-card>
</template>

<script>
import TransactionList from '@/components/TransactionList'

export const ROUTE_NAME = 'Transactions'

export default {
  name: ROUTE_NAME,
  components: {
    TransactionList
  },
  data () {
    return {
      search: '',
      dialog: false,
      reportDialog: false,
      origin: 'dubai',
      destination: 'ajman',
      modalData: {},
      url:
        'https://www.google.com/maps/embed/v1/directions?key=AIzaSyBIzTdBk82FwXWdetAl1PxbpFxyTiHZWLU'
    }
  },
  methods: {
    openReport () {
      console.log('HERE')
      this.dialog = false
      this.reportDialog = true
    },
    src: function () {
      return (
        this.url + '&origin=' + this.origin + '&destination=' + this.destination
      )
    },
    viewTransaction (value) {
      this.dialog = true
      this.modalData = value
    }
  }
}
</script>
