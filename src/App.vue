<template>
  <div>
    <b-navbar toggleable="sm" variant="light">
      <b-navbar-brand>mDNS Tools</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-nav pills class="ml-auto">
          <transition name="fade" mode="out-in">
            <b-nav-item
              variant="success"
              :link-classes="[
                status === 'STARTED' ? 'text-dark' : 'text-light bg-success',
              ]"
              v-if="status === 'STOPPED'"
              @click="onStartMonitor"
              >Start Monitor</b-nav-item
            >
            <b-nav-item
              variant="danger"
              :link-classes="[
                status === 'STOPPED' ? 'text-dark' : 'text-light bg-danger',
              ]"
              v-if="status === 'STARTED'"
              @click="onStopMonitor"
              >Stop Monitor</b-nav-item
            >
          </transition>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col cols="12" sm="10" offset-sm="1" xl="8" offset-xl="2">
          <b-table responsive :fields="fields" :items="clients" show-empty>
            <template #cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? "Hide" : "Show" }} Details
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right">
                    <b>Addresses:</b>
                  </b-col>
                  <b-col>
                    <ul>
                      <li
                        v-for="(address, addressIndex) in row.item.addresses"
                        :key="`address-list-item-${addressIndex}`"
                      >
                        {{ address }}
                      </li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right">
                    <b>Full Object:</b>
                  </b-col>
                  <b-col>
                    <pre>
                      <code>
                      {{ row }}
                      </code>  
                    </pre>
                  </b-col>
                </b-row>
              </b-card>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "App",
  data() {
    return {
      clients: [],
      fields: [
        {
          key: "name",
        },
        {
          key: "type",
        },
        {
          key: "host",
        },
        {
          key: "port",
        },
        {
          key: "protocol",
        },
        {
          key: "fqdn",
          label: "FQDN",
        },
        {
          key: "actions",
          label: "",
        },
      ],
      status: "STOPPED",
    };
  },
  mounted() {
    ipcRenderer.on("add_client", (evt, client) => {
      this.onAddClient(client);
    });

    ipcRenderer.on("monitor-started", () => {
      this.status = "STARTED";
    });
    ipcRenderer.on("monitor-stopped", () => {
      this.status = "STOPPED";
    });
  },
  methods: {
    onAddClient(client) {
      console.log(
        this.clients.findIndex((_client) => _client.host === client.host)
      );
      // if (
      //   this.clients.findIndex((_client) => _client.host === client.host) === -1
      // )
        this.clients.push(client);
    },
    onStartMonitor() {
      ipcRenderer.send("start-monitor");
    },
    onStopMonitor() {
      ipcRenderer.send("stop-monitor");
    },
  },
};
</script>
