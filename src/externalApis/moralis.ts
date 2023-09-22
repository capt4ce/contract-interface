export const getMoralisNftOwners = async (contractAddress: string, network: string) => {
    const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/owners?chain=${network}&format=decimal`;

    return fetch(url, {
        headers: {
            'X-API-Key':
                'H5Fpj640KkNGsFpx6ofJ51dq39j78rbS3bjbutjI19Zws78yJzdefJO5AwOfZ2YP',
        },
    }).then((res) => res.json());
};