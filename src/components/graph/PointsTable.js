import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PointsTable = ({ points }) => {
    return (
        <DataTable value={points} paginator rows={10} responsiveLayout="scroll">
            <Column field="id" header="ID" />
            <Column field="xCoord" header="X" />
            <Column field="yCoord" header="Y" />
            <Column field="result" header="Result" body={(data) => (data.result ? 'Hit' : 'Miss')} />
            <Column field="currentTime" header="Time" />
            <Column field="elapsedTime" header="Elapsed Time" />
        </DataTable>
    );
};

export default PointsTable;
