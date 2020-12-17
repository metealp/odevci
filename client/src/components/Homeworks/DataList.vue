<template #list="slotProps">
    <div class="p-col-12">
        <div class="car-details">
            <div>
                <div class="p-grid">
                    <div class="p-col-12">Vin: <b>{{slotProps.data.vin}}</b></div>
                    <div class="p-col-12">Year: <b>{{slotProps.data.year}}</b></div>
                    <div class="p-col-12">Brand: <b>{{slotProps.data.brand}}</b></div>
                    <div class="p-col-12">Color: <b>{{slotProps.data.color}}</b></div>
                </div>
            </div>
            <Button icon="pi pi-search"></Button>
        </div>
    </div>
</template>
<script>
// import DataView from 'primevue/dataview';

export default {

};

</script>

<style>

</style>
