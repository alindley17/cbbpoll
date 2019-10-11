<template>
	<div class="container">
		<section class="section">
			<b-table 
				v-sortable="sortableOptions"
				:data="data"
				custom-row-key="id">

				<template slot-scope="props">
					<b-table-column label="Rank" width="40" numeric>
						{{ rank(props.row) }}
					</b-table-column>
					<b-table-column label="Team">
						<b-field>
	            <!-- <b-select
                placeholder="Select a Team"
                expanded
                :value="props.row.team">
                <option value="id">UNC</option>
                <option value="id">Not Duke</option>
	            </b-select> -->
	            <b-autocomplete
                v-model="selectedTeam"
                placeholder="e.g. Alabama"
                :keep-first="true"
                :open-on-focus="true"
                :data="filteredDataObj"
                field="user.first_name"
                @select="option => selected = option">
            </b-autocomplete>
		        </b-field>
					</b-table-column>
					<b-table-column label="Explanation">
						<b-field>
            	<b-input placeholder="Explanation (optional)"></b-input>
        		</b-field>
					</b-table-column>
				</template>
			</b-table>
			<hr>
			<b-button @click="test" type="is-primary">Submit</b-button>
		</section>
		 

	</div>
</template>

<script>
import Sortable from 'sortablejs'

const createSortable = (el, options, vnode) => {
	return Sortable.create(el, {
		...options,
		onEnd: function (evt) {
			const data = vnode.context.data
			const item = data[evt.oldIndex]
			if (evt.newIndex > evt.oldIndex) {
				for (let i = evt.oldIndex; i < evt.newIndex; i++) {
					data[i] = data[i + 1]
				}
			} else {
				for (let i = evt.oldIndex; i > evt.newIndex; i--) {
					data[i] = data[i - 1]
				}
			}
			data[evt.newIndex] = item;
			// vnode.context.$buefy.toast.open(`Moved ${item.first_name} from row ${evt.oldIndex + 1} to ${evt.newIndex + 1}`)
		}
	})
}
const sortable = {
	name: 'sortable',
	bind(el, binding, vnode) {
		const table = el.querySelector('table')
		table._sortable = createSortable(table.querySelector('tbody'), binding.value, vnode)
	},
	update(el, binding, vnode) {
		const table = el.querySelector('table')
		table._sortable.destroy()
		table._sortable = createSortable(table.querySelector('tbody'), binding.value, vnode)
	},
	unbind(el) {
		const table = el.querySelector('table')
		table._sortable.destroy()
	}
}

export default {
	directives: { sortable },
	data() {
		return {
			sortableOptions: {

			},
			name: 'Alabama',
			data: [
				{ 'id': 1, team: ''},
				{ 'id': 2, team: ''},
				{ 'id': 3, team: ''},
				{ 'id': 4, team: ''},
				{ 'id': 5, team: ''},
				{ 'id': 6, team: ''},
				{ 'id': 7, team: ''},
				{ 'id': 8, team: ''},
				{ 'id': 9, team: ''},
				{ 'id': 10, team: ''},
				{ 'id': 11, team: ''},
				{ 'id': 12, team: ''},
				{ 'id': 13, team: ''},
				{ 'id': 14, team: ''},
				{ 'id': 15, team: ''},
				{ 'id': 16, team: ''},
				{ 'id': 17, team: ''},
				{ 'id': 18, team: ''},
				{ 'id': 19, team: ''},
				{ 'id': 20, team: ''},
				{ 'id': 21, team: ''},
				{ 'id': 22, team: ''},
				{ 'id': 23, team: ''},
				{ 'id': 24, team: ''},
				{ 'id': 25, team: ''}
			],
			// TODO: get this array from backend
			allTeams: [
				{
			    "id": 1,
			    "full_name": "University of North Carolina",
			    "short_name": "UNC",
			    "nickname": "Tar Heels",
			    "conference": "ACC"
				},
				{
			    "id": 2,
			    "full_name": "Duke",
			    "short_name": "Duke",
			    "nickname": "Blue Devils",
			    "conference": "ACC"
				},
				{
			    "id": 3,
			    "full_name": "University of Virginia",
			    "short_name": "UVA",
			    "nickname": "Wahoos",
			    "conference": "ACC"
				},
				{
			    "id": 4,
			    "full_name": "Virginia Tech",
			    "short_name": "VT",
			    "nickname": "Hokies",
			    "conference": "ACC"
				},
				{
			    "id": 5,
			    "full_name": "North Carolina State University",
			    "short_name": "NCSU",
			    "nickname": "Wolf Pack",
			    "conference": "ACC"
				},
				{
			    "id": 6,
			    "full_name": "Maryland",
			    "short_name": "UM",
			    "nickname": "Terrapins",
			    "conference": "Big Ten"
				}
			]
		}
	},
	computed: {
    filteredDataObj() {
      return this.allTeams.filter((option) => {
        return option.full_name
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
	methods: {
		test() {
			console.log('data', this.data)
		},
		rank(item) {
			return this.data.indexOf(item) + 1
		}
	}
}

</script>

<style>

</style>
