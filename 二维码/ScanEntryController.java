@RestController
@RequestMapping("/scan")
public class ScanEntryController extends BaseController {
@GetMapping("/productionAdd")
    public int addProduction(Integer id,String description, String instruction, String riskLevel, String processMethod,Integer amount,String username){
   //将二维码信息上传到数据库（二维码中包含id且生成的二维码id不重复）
    Production production=new Production();
        production.setId(id);
        production.setDescription(description);
        production.setInstruction(instruction);
        production.setRisklevel(riskLevel);
        production.setProcessmethod(processMethod);
        production.setAmount(amount);
    System.out.println("添加成功--->" +"产品id："+id+"，产品名："+description+",注意事项："+instruction+",危险程度:"+riskLevel+",处理方式:"+processMethod);
      return productionMapper.insert(production);
}
//将上面添加的产品和用户进行关联，前台请求扫码成功后请求该方法
@GetMapping("/connect")
    public void connect(String username,Integer id){
    Integer production_id=id;
    System.out.println(production_id);
    System.out.println(username);
    Producer producer= producerMapper.ByProducerName(username);
    Integer producer_id=producer.getId();
    Producerandproduction producerandproduction=new Producerandproduction();
    producerandproduction.setProducerId(producer_id);
    producerandproduction.setProductionId(production_id);
    //通过自定义方法
    producerandproductionMapper.insert(producerandproduction);

}

}
