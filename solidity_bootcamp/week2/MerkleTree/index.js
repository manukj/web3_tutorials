class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot(leaves = this.leaves) {
        if (leaves.length === 1) {
            return leaves[0];
        }
        const layer = [];
        let i;
        for (i = 0; i < leaves.length-1; i += 2) {
            const left = leaves[i];
            const right = leaves[i + 1];
            layer.push(this.concat(left, right));
        }
        if (i == leaves.length-1){
            layer.push(leaves[i])
        }
        return this.getRoot(layer);
    }

    getProof(index,layer = this.leaves, proof=[]){
        if(layer.length === 1) return proof;
        var newLayer = [];
        for(let i=0; i< layer.length ;i+=2){
            const left = layer[i]
            const right = layer[i+1]
            if(!right){
                newLayer.push(left)
            }else{
                newLayer.push(this.concat(left,right))
                if(i == index || i=== index-1){
                    let isLeft = (index % 2 == 0 );
                    proof.push({
                        data: isLeft ? right : left,
                        left: !isLeft
                    });
                }
            }
        }
        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}

module.exports = MerkleTree;