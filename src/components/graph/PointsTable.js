import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PointsTable = ({ points }) => {
    return (
        <DataTable value={points} paginator rows={10} className='Table'>
            <Column field="id" header="ID" />
            <Column field="x" header="X" />
            <Column field="y" header="Y" />
            <Column field="r" header="R" />
            <Column field="result" header="Result" body={(data) => (data.result ? 'Hit' : 'Miss')} />
            <Column field="currentTime" header="Time" />
            <Column field="elapsedTime" header="Elapsed Time (ms)" />
        </DataTable>
    );
};

export default PointsTable;
