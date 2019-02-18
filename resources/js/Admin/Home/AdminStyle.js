export const getTheadProps = rowInfo => {
    if (rowInfo) {
        return {
            style: {
                backgroundColor: '#1e282cd9',
                color: '#F2F2F2',
            }
        }
    }
};

export const getTrProps = rowInfo => {
    if (rowInfo) {
        return {
            style: {
                fontSize: '9pt',
                textAlign: 'center',
                backgroundColor: 'white'
            }
        }
    }
};