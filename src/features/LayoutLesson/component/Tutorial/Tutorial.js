import React, { useState } from "react";
import { Modal } from "antd";
import { Steps } from "antd";
import "./Tutorial.scss";
const { Step } = Steps;

const steps = [
  {
    content:
      "Toàn bộ nội dung các bài học như là video, hình ảnh, văn bản sẽ được hiển thị ở đây nhé ^^",
    img: "https://lh3.googleusercontent.com/bYzhgySawDh5SxZiHxgrkZhu9dLjD3G0OCvORbYpDxnPr3b2lXCF9jEDj9rvZTvCYMGrK31uTg2oDEo6nfi07IRNyM-SPlYnfQogrk_IhlucSQaQtjblrk59EN-Ya8OjO1gLtKEVmNABB_faaCNeWleag3o9CPBQoVp8evO8dQXcB0vLvMxxSCmYn3s5jKz3N3Y9W6T7-LVILsIC5YpaGxVMrWb0L5ljkk3sf7BLt6UtKegf7ofVZqBTZM8pLnNthfS4uv6Vm0CBV4_94vdS8EIIHAUXB1m7rOp6-b0V-qkRXfOl05bgvxhXdCGhVKGb6SJJpNYbKfEo7KD8Ghqi7qxeov8nVQCBCNF92gqptbH7OM4IgWtSQ8zNyq6BcImTcOTVL0kA_WM149w14fcIOvAPrvreCA7LGK01gcSw3gfOKUupM-KkL-5r9WhVtYpWhZmFPt1CH-Tk845C2xuE-S9ND1_RHfb3OHnxUHj6qKRHOt86Dq-HrcDIcYdAfFobHKDAvTa1ix5p7mc3d-hytv-41D66sDpcfiVWevLW23rBOLSNXoWEp2l9-cOsYlVkkVEt1UVQkW0TsLvzmJBzYoGLwbrOLwgWlRgcrhecePVubGgwSUTIOefDED_ZCsTBlrSpK_lC5SWM2SAxMykHsJVDibnhaCkQCKPNeE404DHMydttEFPHMaUWFeBDSoQGfJdDXr90rY8Ey1_F9wANqbsS=w1438-h692-no?authuser=0",
  },
  {
    content:
      "Đây là danh sách các bài học tại khóa này. Cậu sẽ rất thường xuyên tương tác tại đây để chuyển bài học và làm bài tập đấy >_<",
    img: "https://lh3.googleusercontent.com/ccCsNN2ClukupdHVsRIQTFYxPx4V45CIBeaGNBchoEYXSG9MsrBzF2fM9nlCyl6IEu2-GMNuAfBifDK7Ow8NtwbQiYkxHYC_BMiM0oUzOBEFo9CGPY4l1YsZ00D_qTMN0Vcmngflb8aObd0bWz1sOHBiiUlidFzTfu_x-JYaV9SMjWqyjGouhC2E4fth8HZ5lVBrcBsSptjjUr5yH4BiyjkbiY609j5ScGo5sP7n8z6uiLqcihwL2MGR69Mn5EBy14dAodBkY_GoQZpXlV--_gD_a7BJBywvnE8KI0AB9r-evGcCbJ0ZbzkdTXEiUh3LJp8kUPfZFaEC7CgmUw75N48KLcRcXpwq6TO0oGs7C2YhZNUUdfXDa_LXWTIcPMZp_RHMEebP6_kSvqN3Ldvrwlk5geyms9Gubd7ZgWmUjC7cuVlkheWArk9rJY4p907u9RRNHq9esH2tELhO-5v8QsH73Ki6SbVhPq1edS2IRQtbDtDBykwceao_BzPWtj5MnDsYhm4Ly0xDHc0fhhHlilC4_G2w9IuMA9mQVri9mbekJuJHHN3ej5WIYAezUo1sA5oo8njYlfVoWl9YjRevNHM7qHwZk_9wEqsyiP3-j--rssRooK77bCjf36dvGPs0lVd_PW2Bbm2jTO1hedZBzCXI-DSLmpPZiCKDnsTuT0T0IaKO_xgxuD-sXcdwK8NkwHjO5eyaXSY7S9LG-kH68EQl=w481-h792-no?authuser=0",
  },
  {
    content:
      "Đây là bài học đầu tiên dành cho cậu, khi học xong bài học này Miu sẽ đánh `Tích xanh` bên cạnh để đánh dấu cậu đã hoàn thành bài học nhé!",
    img: "https://lh3.googleusercontent.com/D61WMAZhgeG85bLDaZK8eK88uTSJl0By0xUYEboRPy_ZST2hOSssQ5rytN8es9zzenCBfkCDAhlCW0DTOyJeY9YiiV9JERoF5WnwDk5KdpSFR5WQAluYw2Hyd29Opc3Y80cbc8yfsgM5Tr3HDvp9s4qL3U-vqBfPb7-P8BiUvpmfi5R4hcRF73w5x4E89N50fLYpmko3unV72VNTc4kt2zrmqXFDs3p-jwGWizinIOkd4O8DpwxjE0W6ZRGPkREKY55Uwt6W-S53TKJ46G0wQu0sq33tpM6pdMJIeR8CoVx3sY89yxlv-tQtMfwC8smDdB59PR3zEYIicZ8QNofZac65X6Hh3SYYv6z27gdFRxzuA0VpRSok5Y0mABv8NMgiF2SAjzalhr87Hd9Gvv7rd_jPUUrYPLiz8kgPfowRNRWF8uTUvJq0RpaMjNsqhUKXA01SFWgy25bNC0VA_kr1PxjFVYeDi-25GSpCbDapnxRSSew_UbMM2BpLCPmenBfIgy4JbMpFbw67Pqti_NC1aT2fST266XELhO7ra_hf6GUHof8MSvNqEMBlXk7E8CpVdxBKwfOy7zgZwIRBOIt7gKnuQIaM8p_Dz05uO5Rj5I-t2OHjL2Co-fiakDDBywrJNO4y_RlupFfsACROWdinracAQCZeXX4VypCVcZ8sydssW042bpcr9OiRBosN2Atn2oVm7aAL8Fq--Zrs5s9M3vRP=w480-h357-no?authuser=0",
  },
  {
    content:
      " Theo mặc định các bài học tại F8 đều bị khóa. Khi cậu hoàn thành bài học phía trước thì bài sau sẽ tự động được mở. Mà lúc học cậu đừng có tua video, vì sẽ không được tính là hoàn thành bài học đâu đấy nhé ^^",
    img: "https://lh3.googleusercontent.com/RU7VfmaC7r6-OCHkdNftxhWhWGXT7CHT12bTmIgo8nB4KiFEJ82ODZLhffJf31W2vKv_TKvxe-Ei77OwetUmm9EE2g4v7KgZRaTmFANOP4ZLXNHhkE5cAI3gdXAwKGENXX92NfGief8bgmM5iPzOH_KMKZ-_ko_HMkdUIb5XnY3LQSxIqEbQO4x8pgtmLLnLummrurAhFyOcINaKtknj-me9dgGQpT7jqInzx5Sv_UzMn1n173byqR2TtkHfTumRY4vAiH0KfZQbAnAXZBOp_VuvzL62eCOo5TZvr_0WTJuVellLI3lto78Tjixj_ABJ5luq-PKZe8kbO82iaZXRnqK0mXB8RFcnDvQU5Zatja83Lic0T9j6jYe-8_ZGojPZDDy55hgYq7ygv5QWd2tinE-CqupKU1jjj2TbNA4RBWROOMKhmpDJCxKsuNPNo2BH0Ugl5B1DRSHSrTmRX-qtKXxdJRTbWMSEOFby4OR5aRy9dY2EjbKTzKlEKR8FO_afQySz76pi9w-BjLhAFogLXOCAsz0MwrImC43gSvcsZGXgiDKsPDPInNVB12ArelG9TZzhgLh5a48ioGFdYkrg5f0L47DB0tMGXXmfFKjIaRU3hS-BhjWLiNOfYZZqvnnSeWqoSn5ngcePnn9s16tVcDuxzqsPx9sW79OKasNHQ3E-pl7suCvgi9x9wsknDyrOue_bjLsLCteGdpCEGCUxArCZ=w478-h436-no?authuser=0",
  },
  {
    content:
      "Tại F8 có một chức năng rất đặc biệt, đó là chức năng `Tạo ghi chú`. Khi học sẽ có nhiều lúc cậu muốn ghi chép lại đó, tại F8 cậu sẽ không cần tốn giấy mực để làm việc này đâu. Thả tim nào <3",
    img: "https://lh3.googleusercontent.com/4jJ8fCn1HzOW7ATYIl6Chi-qdvO8SlCRV0KX5UtHc5Pk35002od20g8s0DRUAOipFqUCcXXW162ydmyKqeJG4kJwVo9bAFvvr_aFctOhMFI_49weTxTqR-6DDunZEv3UJbPaFaDPMgBappul0zdJ8NFiPkTcAR2N0_RJMq3ipGKKK5JhNdhIv8dFdY27r3lZSts-Al-pR9_gYihKoQqYvGdwciRJAiSVB1lIg0VVf7Z_9ZUwP1TDq7avizKnibC5sE3luJR4xFgWUMEviUv5RSU3fd-8xRTHiRf-yX6NRuXMDodWm9UwKO_idn5hfeo6cjJn0JcpGZDcKdlNGtFiNz1OMwmBwzH-Ck9lb5L_JV0j2YEUQMYGiu1dNCwmkTcLkjJJ4ymstVccJ8l44KHBxn2pQJ3TPEoURW50TKCopYBb543sKehnAHpCdxecn3b2G-h8pqghsgeJNcQi90glYei-F7kXhZnB7skS3ptZ8wcigkdcGpAdfqGFk97xGPgEjQLRAILaF1gg2bKx5h5kfipK2bu9yurEFrny31PDgw7tWBiZ7xNq7Ig_5jzLL-4mOx1bOoe-hBxU2AKkV4bY6D1DCQNWQ1s_aMcG8CuIDkUiIU47V0bRUGFtOQtlvDtYlyNBMrAt5vcxavLDBUFTkftByxrQaCRf7ab6rQe2Qd14i7vptwyPC37w5oKChRsFmwF57heDR0IhuwW6QyMsKu24=w1178-h318-no?authuser=0",
  },
  {
    content:
      "Nếu có bài học nào hay thì cậu bình luận một lời động viên vào đây cũng được nhé. Miu sẽ rất vui và cảm thấy biết ơn đấy <3",
    img: "https://lh3.googleusercontent.com/dUn68q3RgKu52Eqv8lM53xtlYYL7HqHv8j3nuRp9gvOUI_iv1obdHNDwokRuXoWQRyv_e2m4qVAr7ZBq4Q8C-6TDZ3HnPRW3h_6igc4AQx_l7E7FeDed54XI8EyGaDZncW7KJ8ewAV8HxeLOSHiwYWztSp47lcqf0AGKKOhr6pGMuGxwbs5P9Zelq7T07vxUKSJmWPFL0HhsUGQf7fGLs6kDGHKtiOfsGfnyE6d9RRKj3Fp1Bys6oIC2lq9GmAHKT4xYVISalnYqUWk52Pkhj8fVyr-5zvLb1oJF0xg7tKzHBrTRNMBDUYU-Isjq6SgtjVJG18a74FKThcI3tO26vIxBOzCmY8N-jSo3GhHbE4aGyZ_G8wQlEm4lR9qCu4k1OqKlPKj1cktQV5Tpt9WcQLFBEFyqzAqIzueffxwJ4fV2ZG-PzAsRIKn1vQ53oz8FZzNJAx2dU04_K21n28bmvCysGUddA9tMyD77JjU8mvi_OzuEKWwqxRAu-WMcIS7vYHaPaP221rGjWgOkBUpgo96ePK20RvRLKQJXoZfpxqU_59DKJgJ7xoBL9qobvjkKSVWetNcPwsxwtC35HZLW-8qYw0mGtdjwZfUjxWUSW8OHz5JZs5nbjNJnimlpHgPjOX8UOwxCO8KTULa0hO7ZyWqM6iRJtpVsWL3_i01GcNbH9-7FyKb8YXW-2-XwGMFel3lG0UqX-EFvjfoTOY_FdvBl=w867-h832-no?authuser=0",
  },
];
function Tutorial() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = React.useState(0);
  const [hidden, setHidden] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setHidden(!hidden);
    setCurrent(0);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <div className="Tutorial-wrapper">
        <div className="Header-right" onClick={showModal}>
          <i class="fas fa-question-circle"></i>
          <span>Hướng dẫn</span>
        </div>
        <Modal
          width={600}
          destroyOnClose={true}
          closable={false}
          visible={isModalVisible}
          footer={null}
          maskClosable={false}
        >
          <div className="more" hidden={hidden}>
            <p className="info">
              Chào cậu! Mình là Miu - hướng dẫn viên tại F8, mình sẽ đưa cậu đi
              thăm quan và giới thiệu cho cậu hiểu rõ hơn về F8 nhé. Đi thôi!
            </p>
            <input
              type="checkbox"
              id="voice"
              name="tutorial"
              value="Nghe giọng Miu"
            />
            <label for="tutorial"> Nghe giọng Miu </label>
            <div className="button btn-more">
              <button className="no" onClick={handleCancel}>
                Không, cảm ơn!
              </button>
              <button className="yes" onClick={() => setHidden(!hidden)}>
                Theo Miu
              </button>
            </div>
          </div>
          <div className="step more" hidden={!hidden}>
            <Steps current={current}>
              {steps.map((item, i) => (
                <Step key={i} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              <p>{steps[current].content}</p>
              <img alt="introduce" src={steps[current].img} />
            </div>
            <div className="steps-action button">
              {current > 0 && (
                <button
                  style={{ margin: "0 8px", color: "#000" }}
                  onClick={() => prev()}
                >
                  Quay lại
                </button>
              )}
              {current < steps.length - 1 && (
                <button className="primary" onClick={() => next()}>
                  Tiếp theo
                </button>
              )}
              {current === steps.length - 1 && (
                <button className="primary" onClick={handleOk}>
                  Bye bye!
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Tutorial;
